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
