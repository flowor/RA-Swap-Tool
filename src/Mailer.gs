// Sends Mail to Users

var Mailer = new function() {
  
  this.notify = function(status, swap) {
    
    var address, sub;
    var template = HtmlService.createTemplateFromFile('email_templates');
    template.status = status;
    template.swap = swap;
    
    
    switch (status) {
      case EMAIL_STATUS.view:
        address = Users.getByNick(swap.requester).email;
        sub = 'Swap Requested | ' + swap.requested + " on " + swap.fromDate;
        break;
      case EMAIL_STATUS.raApproval:
        address = Users.getByNick(swap.requested).email;
        sub = 'Swap Requested | ' + swap.fromDate + " for " + swap.requester;
        break;
      case EMAIL_STATUS.rdApproval:
        address = Users.getRD().email;
        sub = 'Swap Requested | ' + swap.requester + " on " + swap.fromDate;
        break;
      case EMAIL_STATUS.sraApproval:
        address = Users.getSRA().email;
        sub = 'Swap Approved | ' + swap.requester + " on " + swap.fromDate;
        break;  
      case EMAIL_STATUS.approved:
        address = Users.getByNick(swap.requester).email + "," + Users.getByNick(swap.requested).email;
        sub = 'Swap Requested | ' + swap.requested + " on " + swap.fromDate;
        break;  
    }
    
    
    
    MailApp.sendEmail({
      to: address,
      subject: sub,
      htmlBody: template.evaluate().getContent(),
    });
  };
};

