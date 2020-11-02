const GoogleUtilities = require('./GoogleUtilities');
const { google } = require('googleapis');

/**
 * Docs Utilities
 */
class GoogleDocsUtilities extends GoogleUtilities {

  /**
   * Docs Utilities
   *
   * @param serviceAccount
   * @param privateKey
   * @param errorLogUrl
   * @param errorLogPrefix
   */
  constructor(serviceAccount, privateKey, errorLogUrl, errorLogPrefix) {
    super(serviceAccount, privateKey, errorLogUrl, errorLogPrefix);
  }

  /**
   * Prints the title of a doc
   *
   * @param docId default is example doc id
   */
  async getDoc(docId = "195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE") {
    console.log(`${this._errorLogPrefix}Beginning getDoc`);
    try {
      const scopes = [
        'https://www.googleapis.com/auth/documents',
      ];
      let authentication = await this.createServiceAccountAuthentication(scopes);
      const docs = google.docs({version: 'v1', auth: authentication});
      let result = await docs.documents.get({
        documentId: docId,
      }, null);
      console.log(`${this._errorLogPrefix}Finishing getDoc`);
      return result;
    } catch (error) {
      console.log('The API returned an error: ' + error);
    }
  }
}

module.exports = GoogleDocsUtilities;
