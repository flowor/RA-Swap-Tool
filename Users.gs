var Users = new function() {
  
  // User Object
  var User = function(role, firstName, lastName, nick, cell, email, ext, assign) {
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.nick = nick;
    this.cell = cell;
    this.email = email;
    this.ext = ext;
    this.assign = assign;
    this.fullName = firstName + " " + lastName;
  };
  
  this.users = [];
  
  // Sets up the users array and fills it with data from the ra spreadsheet
  this.init = function() {
    // Get user table from google sheets
    var user_table = SpreadsheetApp.openById(documentProperties.getProperty('RA_DATA_ID')).getSheets()[0].getDataRange().getValues(); 
    var i, tempuser;

    for (i=1; i<user_table.length; i++) {
      // Create a new user
      tempuser = new User(user_table[i][0], user_table[i][1], user_table[i][2], user_table[i][3],
                          user_table[i][4], user_table[i][5], user_table[i][6], user_table[i][7]);
      this.users.push(tempuser);
    }
  };
  
  /**
   * Returns a user object for a given nickname, or -1 if not found
   * @param {string} nick - The user's nickname as written in the spreadsheet
   * @returns {User}
   */
  this.getByNick = function(nick) {
    
    for (var i=0; i<this.users.length; i++) {
      if (this.users[i].nick == nick)
        return this.users[i];
    }
 
    return -1;
  };
};
