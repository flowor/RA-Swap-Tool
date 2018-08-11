/**
* Unique Key Generator
*/
function generateKey() {
  var key = "";
  var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  var len = scriptProperties.getProperty('KEY_SIZE');
  
  for (var i = 0; i < len; i++)
    key += charset.charAt(Math.floor(Math.random() * charset.length));

  return key;
}


/**
 * Gets the Apps Script URL
 */
function getAppUrl() {
  return ScriptApp.getService().getUrl();
}


/**
 * Forms a url with an action
 * @param {string} action - view, ra-approve, rd-approve, sra-approve
 * @param {swap} swap - the swap object containing keys and ids
 */
function getLink(action, swap) {
  switch (action) {
    case 'view':
      return getAppUrl() + "?action=" + action + "&id=" + swap.id;
    case 'ra-approve':
      return getAppUrl() + "?action=" + action + "&id=" + swap.id + "&key=" + swap.raKey;
    case 'rd-approve':
      return getAppUrl() + "?action=" + action + "&id=" + swap.id + "&key=" + swap.rdKey;
    case 'sra-approve':
      return getAppUrl() + "?action=" + action + "&id=" + swap.id + "&key=" + swap.sraKey;
  }
  
  return getAppUrl();
  
}

/**
 * SHA512 Hasher
 */
function SHA512(s) {
  var hexstr = '';
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_512, s);
  for (i = 0; i < digest.length; i++) {
    var val = (digest[i]+256) % 256;
    hexstr += ('0'+val.toString(16)).slice(-2);
  }
  return hexstr;
}

/**
 * Include html files within other html files
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function formatDate(date) {
  if (date == "")
    return "";
  return new Date(date).toUTCString().split(' ').slice(0, 3).join(' ');
}
