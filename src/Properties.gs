// Initialize Property Stores
var scriptProperties = PropertiesService.getScriptProperties();
var documentProperties = PropertiesService.getDocumentProperties();

scriptProperties.setProperties({
  'VIEW_KEY': '', // SHA512 Hashed password
  'KEY_SIZE': 10
});


// Documents for Storage IDs
documentProperties.setProperties({
  'RA_DATA_ID': '',
  'SWAP_DATA_ID': ''
});


