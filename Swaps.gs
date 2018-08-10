var Swaps = new function() {
  
  // Swap Object
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
      // Create a new user
      tempswap = new Swap(swap_table[i][0], swap_table[i][1], swap_table[i][2], swap_table[i][3], swap_table[i][4], swap_table[i][5], 
							swap_table[i][6], swap_table[i][7], swap_table[i][8], swap_table[i][9], swap_table[i][10]);
      this.swaps.push(tempswap);
    }
  };
  
  /**
   * Returns a swap object for a given id
   * @param {string} id - The swap's id as written in the spreadsheet
   * @returns {Swap}
   */
  this.getById = function(id) {
    
    for (var i=0; i<this.swaps.length; i++) {
      if (this.swaps[i].id == id)
        return this.swaps[i];
    }
 
    return -1;
  };
};
