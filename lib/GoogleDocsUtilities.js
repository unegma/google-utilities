const DOCS_SCOPES = ['https://www.googleapis.com/auth/documents'];
const API_VERSION = 'v1';
const { google } = require('googleapis');
const GoogleUtilities = require('./GoogleUtilities'); // todo why cant do const { GoogleUtilities } = require('./');
const GoogleDriveUtilities = require('./GoogleDriveUtilities'); // todo why cant do const { GoogleUtilities } = require('./');

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
  async getDocTitle(docId) {
    console.log(`${this._errorLogPrefix}Beginning getDocTitle`);
    try {
      let doc = await this.getDoc(docId);
      let title = doc.data.title;
      console.log(`${this._errorLogPrefix}Finishing getDocTitle`);
      return title;
    } catch (error) {
      console.log('The API returned an error: ' + error);
    }
  }

  /**
   * Prints the body of a doc
   *
   * @param docId default is example doc id
   */
  async getDocBody(docId) {
    console.log(`${this._errorLogPrefix}Beginning getDocBody`);
    try {
      let doc = await this.getDoc(docId);
      let body = "";
      doc.data.body.content.forEach((b1) => {
        if (b1.paragraph) {
          b1.paragraph.elements.forEach((b2) => {
            body += b2.textRun.content;
          })
        }
      })
      console.log(`${this._errorLogPrefix}Finishing getDocBody`);
      return body;
    } catch (error) {
      console.log('The API returned an error: ' + error);
    }
  }


  /**
   * Low Level Functions
   */

  /**
   * Do Authentication and get docObject
   *
   * @param docId This uses the google sample doc id by default
   * @param returnDocObject
   * @param scopes
   * @param version
   * @returns {Promise<*>}
   */
  async getDoc(docId = '195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE', returnDocObject = false,
             scopes = DOCS_SCOPES, version = API_VERSION) {
    let authentication = await this.createServiceAccountAuthentication(scopes);
    let docsObject = google.docs({version: version, auth: authentication});

    if(returnDocObject) {
      return docsObject;
    }

    let doc = await docsObject.documents.get({
      documentId: docId,
    }, null);
    console.log(docId);
    return doc;
  }
}

module.exports = GoogleDocsUtilities;
