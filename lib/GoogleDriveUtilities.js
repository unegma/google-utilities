const DRIVE_SCOPES = ['https://www.googleapis.com/auth/drive'];
const API_VERSION = 'v3';
const { google } = require('googleapis');
const GoogleUtilities = require('./GoogleUtilities'); // todo why cant do const { GoogleUtilities } = require('./');

/**
 * Drive Utilities
 */
class GoogleDriveUtilities extends GoogleUtilities {

  /**
   * Drive Utilities
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
   * Low Level Functions
   */

  /**
   * Do Authentication and get file
   *
   * @param fileId This uses the google sample doc id by default
   * @param returnDocObject
   * @param scopes
   * @param version
   * @returns {Promise<*>}
   */
  async getFile(fileId = '195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE', returnDocObject = false,
               scopes = DRIVE_SCOPES, version = API_VERSION) {
    let authentication = await this.createServiceAccountAuthentication(scopes); // todo could do this when creating instance of class?
    let driveObject = google.drive({version: version, auth: authentication});

    if(returnDocObject) {
      return driveObject;
    }

    let file = await driveObject.documents.get({
      fileId: fileId,
    }, null);
    console.log(fileId);
    return file;
  }
}

module.exports = GoogleDriveUtilities;
