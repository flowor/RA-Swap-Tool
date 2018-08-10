/**
* Unique Key Generator
*/
function generateKey(len) {
  var key = "";
  var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < len; i++)
    key += charset.charAt(Math.floor(Math.random() * charset.length));

  return key;
}
