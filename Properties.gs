// Initialize Property Stores
var scriptProperties = PropertiesService.getScriptProperties();
var documentProperties = PropertiesService.getDocumentProperties();

// APP Url
scriptProperties.setProperty('URL', 'https://script.google.com/macros/s/Replace with published url');

// Documents for Storage IDs
documentProperties.setProperties({
  'RA_DATA_ID': 'Replace With ID of Spreadsheet containing RA information',
  'SWAP_DATA_ID': 'Replace with ID of Spreadsheet used to store swaps'
});


