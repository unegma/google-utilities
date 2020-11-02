const fetch = require('node-fetch');
const fs = require('fs').promises;
const { google } = require('googleapis');
const { ErrorHandler } = require('@unegma/error-handler');
const { SlackErrorHandler } = require('@unegma/error-handler');
const { GoogleIntegrationError, GoogleUndefinedCredentialsError } = require('./errors');

/**
 * Base Utilities Class
 */
class GoogleUtilities {

  /**
   * Base Utilities
   *
   * Need to set up a service account to use
   * errorLogPrefix will prefix the start and end of function console logs
   *
   * @param serviceAccount
   * @param privateKey
   * @param errorLogUrl
   * @param errorLogPrefix
   */
  constructor(serviceAccount, privateKey, errorLogUrl = "", errorLogPrefix = "## ") {
    this._serviceAccount = serviceAccount;
    this._privateKey = privateKey;
    this._errorLogUrl = errorLogUrl;
    this._errorLogPrefix = errorLogPrefix;

    // error logging
    if (this._errorLogUrl.includes('slack')) {
      this._errorHandler = new SlackErrorHandler(this._errorLogUrl);
    } else {
      this._errorHandler = new ErrorHandler();
    }
  }

  /**
   * LOW LEVEL FUNCTIONS
   */

  /**
   * Authenticate with Service Account (make sure to share the file with the service account)
   *
   * @param scopes
   * @returns {Promise<JWT>}
   */
  async createServiceAccountAuthentication(scopes) {
    console.log(`${this._errorLogPrefix}Beginning createAuthentication`);
    const authentication = new google.auth.JWT(
        this._serviceAccount, null,
        JSON.parse(`"${this._privateKey}"`), scopes
    );
    console.log(`${this._errorLogPrefix}Finishing createAuthentication`);
    return authentication;
  }

  // /**
  //  * todo what happens when the token expires?
  //  *
  //  * Create OAuth2 Client
  //  *
  //  * @returns {Promise<OAuth2Client>}
  //  */
  // async createOAuth2Client() {
  //   console.log(`${this._errorLogPrefix}Beginning createOAuth2Client`);
  //   // let oAuth2Client = new google.auth.OAuth2(this._clientId, this._clientSecret, this._redirectURI) // todo redirectURI not needed?
  //   let oAuth2Client = new google.auth.OAuth2(this._clientId, this._clientSecret)
  //   oAuth2Client.setCredentials({
  //     access_token: this._accessToken, // todo works without this
  //     refresh_token: this._refreshToken,
  //     // scope: this._scope, // todo needed?
  //     // token_type: 'Bearer', // todo needed?
  //     // expiry_date:  1234567890 // todo needed?
  //   });
  //   console.log(`${this._errorLogPrefix}Finishing createOAuth2Client`);
  //   return oAuth2Client;
  // }

  // used for testing
  throwError() {
    throw new GoogleIntegrationError();
  }

}

module.exports = GoogleUtilities;
