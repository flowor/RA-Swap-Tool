/**
* Trigger for when an RA fills out form
* @param {object} e
*/
function onSubmit(e) {
  init();
  
  // Get items from response
  var items = e.response.getItemResponses();
  
  
  // Add a new swap to spreadsheet
  var swap = Swaps.addSwap(items[0].getResponse(), items[1].getResponse(), items[2].getResponse(), items[3].getResponse(), items[4].getResponse());
  
  // Send email with a link to view the swap
  Mailer.notify(EMAIL_STATUS.view, swap);
    
  // Notify the requested ra to approve the swap
  Mailer.notify(EMAIL_STATUS.raApproval, swap);
}
