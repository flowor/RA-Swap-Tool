// DEBUG
function debug(){  
  
  //var i = Swaps.getIndexById("lkkIHdMdeR");
  //Logger.log(Swaps.sraApprove(i, "lEqsinzblN"));
}
// -------

/**
 * Initializes Users and Swaps Objects
 */
function init() {
  Users.init();
  Swaps.init();
}


/**
 * Controller
 * Looks for the following parameters: action, id, key
 * action can be: view, ra-approve, rd-approve, sra-approve, or view-all
 * @param {event} e Event passed to doGet, with querystring
 * @returns {String/html} Html to be served
 */
function doGet(e) {
  
  init();

  if (!e.parameter.action) {
    // No action provided, show Home
    return HtmlService.createTemplateFromFile('Index').evaluate();
  }
  
  // Decide which view to load based on action parameter
  switch (e.parameter.action) {
    case 'view':
      // Check index
      if (!e.parameter.id || e.parameter.id.trim() == "")
        return errorPage(ERROR_CODE.noId);
      
      var index = Swaps.getIndexById(e.parameter.id);
      
      if (index == -1)
        return errorPage(ERROR_CODE.invalidId);
      
      // Else index is valid
      var template = HtmlService.createTemplateFromFile('view');
      template.index = index;
      return template.evaluate();
    
    case 'ra-approve':
      // Check index
      if (!e.parameter.id || e.parameter.id.trim() == "")
        return errorPage(ERROR_CODE.noId);
      
      var index = Swaps.getIndexById(e.parameter.id);
      
      if (index == -1)
        return errorPage(ERROR_CODE.invalidId);
      
      // Index is valid, check key
      if (!e.parameter.key || e.parameter.key.trim() == "")
        return errorPage(ERROR_CODE.noKey);
      
      var code = Swaps.raApprove(index, e.parameter.key);
      
      if (code.status == 1) {
        return errorPage(code);
      }
      
      var template = HtmlService.createTemplateFromFile('approve');
      template.index = index;
      template.message = code;
      return template.evaluate();
      
    
    case 'rd-approve':
      // Check index
      if (!e.parameter.id || e.parameter.id.trim() == "")
        return errorPage(ERROR_CODE.noId);
      
      var index = Swaps.getIndexById(e.parameter.id);
      
      if (index == -1)
        return errorPage(ERROR_CODE.invalidId);
      
      // Index is valid, check key
      if (!e.parameter.key || e.parameter.key.trim() == "")
        return errorPage(ERROR_CODE.noKey);
      
      var code = Swaps.rdApprove(index, e.parameter.key);
      
      if (code.status == 1)
        return errorPage(code);
      
      var template = HtmlService.createTemplateFromFile('approve');
      template.index = index;
      template.message = code;
      return template.evaluate();
      
    case 'sra-approve':
      // Check index
      if (!e.parameter.id || e.parameter.id.trim() == "")
        return errorPage(ERROR_CODE.noId);
      
      var index = Swaps.getIndexById(e.parameter.id);
      
      if (index == -1)
        return errorPage(ERROR_CODE.invalidId);
      
      // Index is valid, check key
      if (!e.parameter.key || e.parameter.key.trim() == "")
        return errorPage(ERROR_CODE.noKey);
      
      var code = Swaps.sraApprove(index, e.parameter.key);
      
      if (code.status == 1)
        return errorPage(code);
      
      var template = HtmlService.createTemplateFromFile('approve');
      template.index = index;
      template.message = code;
      return template.evaluate();
      
    case 'view-all':
      if (!e.parameter.key || e.parameter.key.trim() == "")
        return errorPage(ERROR_CODE.noViewKey);
      
      // Hashed Passcode key
      var passcode = scriptProperties.getProperty('VIEW_KEY');
      
      // Validate hashed parameter against stored hashed key
      if (SHA512(e.parameter.key) != passcode)
        return errorPage(ERROR_CODE.invalidViewKey);
        
     return HtmlService.createTemplateFromFile('list').evaluate();
      
  }
  
  
  // else, use page parameter to pick an html file from the script
  return HtmlService.createTemplateFromFile('Index').evaluate();
}


function errorPage(e) {
  var template = HtmlService.createTemplateFromFile('error');
  template.message = e;
  return template.evaluate();
}


