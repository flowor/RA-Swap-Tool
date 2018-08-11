var Swaps = new function() {
  
  // Swap Object
  // Requester and requested are nicks that can be linked to a user
  var Swap = function(id, timestamp, requester, requested, fromDate, toDate, comments, status, raKey, rdKey, sraKey) {
        this.id = id;
        this.timestamp = timestamp;
        this.requester = requester;
        this.requested = requested;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.comments = comments;
        this.status = status;
        this.raKey = raKey;
        this.rdKey = rdKey;
        this.sraKey = sraKey;
  };
  
  this.swaps = [];
  
  // Sets up the swaps array and fills it with data from the swap spreadsheet
  this.init = function() {
    // Get swap table from google sheets
    var swap_table = SpreadsheetApp.openById(documentProperties.getProperty('SWAP_DATA_ID')).getSheets()[0].getDataRange().getValues(); 
    var i, tempswap;

    for (i=1; i<swap_table.length; i++) {
      // Create a new swap
      tempswap = new Swap(swap_table[i][0], swap_table[i][1], swap_table[i][2], swap_table[i][3], swap_table[i][4], swap_table[i][5], 
                                                        swap_table[i][6], swap_table[i][7], swap_table[i][8], swap_table[i][9], swap_table[i][10]);
      this.swaps.push(tempswap);
    }
  };
  
  /**
   * Returns the index of a swap given its id, or -1 if not found
   * @param {string} id - The swap's id as written in the spreadsheet
   * @returns {Swap}
   */
  this.getIndexById = function(id) {
    
    for (var i=0; i<this.swaps.length; i++) {
      if (this.swaps[i].id == id)
        return i;
    }
 
    return -1;
  };
  
   /**
   * Adds swap (with status 0) to local swaps array and spreadsheet
   * @param {string} requester - User who filled out form
   * @param {string} requested - RA Requested to pick up shift
   * @param {string} fromDate - Original Duty Date
   * @param {string} toDate - New Duty Date (if applicable)
   * @param {string} comments
   */
  this.addSwap = function(requester, requested, fromDate, toDate, comments) {
    var sheet = SpreadsheetApp.openById(documentProperties.getProperty('SWAP_DATA_ID')).getSheets()[0];
    var timestamp = new Date().toLocaleString();
    
    // Add swap to local swaps array
    var tempswap = new Swap(generateKey(), timestamp, requester, requested, fromDate, toDate, comments, 0, generateKey(), generateKey(), generateKey());
    this.swaps.push(tempswap);
        
    // ADD tempswap to spreadsheet
    sheet.appendRow([tempswap.id, tempswap.timestamp, tempswap.requester, tempswap.requested, tempswap.fromDate, tempswap.toDate, tempswap.comments, tempswap.status, tempswap.raKey, tempswap.rdKey, tempswap.sraKey]);
  };
  
  
   /**
   * Edits the status of a swap and updates timestamp
   * @param {string} index - index of swap
   * @param {int} status - per STATUS_CODE in Resources.gs: 0 = No Approval, 1 = RA Approval, 2 = RD Approval, 3 = Approved & In calendar
   */
  this.updateStatus = function(index, status) {
    var timestamp = new Date().toLocaleString();
    this.swaps[index].status = status;
    this.swaps[index].timestamp = timestamp;
    
    var table = SpreadsheetApp.openById(documentProperties.getProperty('SWAP_DATA_ID')).getSheets()[0]; 
    table.getRange("B"+(index+2)).setValue(timestamp);
    table.getRange("H"+(index+2)).setValue(status);   
  };
  
  /** 
   * Approves a swap as an RA
   * @param {string} index - index of swap
   * @return {CODE} - Either an error or success code 
   */
  this.raApprove = function(index, key) {
        
    if (this.swaps[index].raKey == key && this.swaps[index].status == 0) {
      // Key must be correct
      this.updateStatus(index, 1);
      return SUCCESS_CODE.raApproved;
    }
    
    // Check if key is provided
    if (key == "")
      return ERROR_CODE.noKey;
    
    switch (this.swaps[index].status) {
      case 0:
        if (this.swaps[index].raKey != key) // Check for incorrect key
          return ERROR_CODE.invalidKey;
      case 1:
      case 2:
        return ERROR_CODE.alreadyApproved;
      default:
        return ERROR_CODE.statusErr;
    }; 
};
  
  /** 
   * Approves a swap as an RD
   * @param {string} index - index of swap
   * @return {CODE} - Either an error or success code 
   */
  this.rdApprove = function(index, key) {
    
    if (this.swaps[index].rdKey == key && this.swaps[index].status == 1) {
      // Key must be correct
      this.updateStatus(index, 2);
      return SUCCESS_CODE.rdApproved;
    }
    
    // Check if key is provided
    if (key == "")
      return ERROR_CODE.noKey;
    
    switch (this.swaps[index].status) {
      case 0:
        return ERROR_CODE.awaitRA;
      case 1:
        if (this.swaps[index].rdKey != key) // Check for incorrect key
          return ERROR_CODE.invalidKey;
      case 2:
        return ERROR_CODE.alreadyApproved;
      default:
        return ERROR_CODE.statusErr;
    };  
  };
  
  
  /** 
   * Approves a swap as an SRA
   * @param {string} index - index of swap
   * @return {CODE} - Either an error or success code 
   */
  this.sraApprove = function(index, key) {
    
    if (this.swaps[index].sraKey == key && this.swaps[index].status == 2) {
      // Key must be correct
      this.updateStatus(index, 3);
      return SUCCESS_CODE.sraApproved;
    }
    
    // Check if key is provided
    if (key == "")
      return ERROR_CODE.noKey;
    
    switch (this.swaps[index].status) {
      case 0:
        return ERROR_CODE.awaitRA;
      case 1:
        return ERROR_CODE.awaitRD;
      case 2:
        if (this.swaps[index].sraKey != key)  // Check for incorrect key
          return ERROR_CODE.invalidKey;
      case 3:
        return ERROR_CODE.alreadyApproved;
      default:
        return ERROR_CODE.statusErr;
    };
  };
};
