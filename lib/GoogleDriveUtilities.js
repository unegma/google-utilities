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
   * @param returnDriveObject
   * @param scopes
   * @param version
   * @returns {Promise<*>}
   */
  async getFile(fileId = '195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE', returnDriveObject = false,
               scopes = DRIVE_SCOPES, version = API_VERSION) {
    let authentication = await this.createServiceAccountAuthentication(scopes);
    let driveObject = google.drive({version: version, auth: authentication});

    if(returnDriveObject) {
      return driveObject;
    }

    let file = await driveObject.files.get({
      fileId: fileId,
    }, null);
    console.log(fileId);
    return file;
  }

  /**
   * Update Permissions
   *
   * @param fileId
   * @param domain
   * @returns {Promise<*>}
   */
  async updatePermissions(fileId, domain) {
    let driveObject = await this.getFile(undefined, true);
    let file = driveObject.permissions.create({
      fileId: fileId,
      resource: {
        role: 'writer', // https://developers.google.com/drive/api/v3/reference/permissions/create
        type: 'domain',
        domain: domain
      }
    });
    return file;
  }
}

module.exports = GoogleDriveUtilities;
