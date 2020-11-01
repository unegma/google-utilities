const GoogleUtilities = require('./GoogleUtilities');
const { GoogleSpreadsheet } = require('google-spreadsheet');

/**
 * Sheets Utilities
 */
class GoogleSheetsUtilities extends GoogleUtilities {

  /**
   * Sheets Utilities
   *
   * @param serviceAccount
   * @param privateKey
   * @param errorLogUrl
   * @param errorLogPrefix
   */
  constructor(serviceAccount, privateKey, errorLogUrl, errorLogPrefix) {
    super(serviceAccount, privateKey, errorLogUrl, errorLogPrefix);
  }

}

module.exports = GoogleSheetsUtilities;
