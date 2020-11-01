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
   * need to get credentials from generated token.json using this flow for you own app:
   * https://developers.google.com/docs/api/quickstart/nodejs
   * errorLogPrefix will prefix the start and end of function console logs
   *
   * the access token is affected by the scope, so if changing scope, will need to regenerate
   *
   * @param clientSecret
   * @param clientId
   * @param redirectURI
   * @param accessToken
   * @param refreshToken
   * @param scope
   * @param errorLogUrl
   * @param errorLogPrefix
   */
  constructor(clientSecret, clientId, redirectURI, accessToken, refreshToken,
              scope = ['https://www.googleapis.com/auth/documents.readonly'],
              errorLogUrl = "", errorLogPrefix = "## ") {

    this._clientSecret = clientSecret;
    this._clientId = clientId;
    this._redirectURI = redirectURI;
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;
    this._scope = scope;

    // this._auth = authMe(credentials);
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
   * Prints the title of a doc
   *
   * @param docId default is example doc id
   */
  async getDoc(docId = "195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE") {
    console.log(`${this._errorLogPrefix}Beginning getDoc`);
    try {
      let oAuth2Client = await this.createOAuth2Client();
      const docs = google.docs({version: 'v1', auth: oAuth2Client});
      let result = await docs.documents.get({
        documentId: docId,
      }, null);
      console.log(`${this._errorLogPrefix}Finishing getDoc`);
      return result;
    } catch (error) {
      console.log('The API returned an error: ' + error);
    }
  }

  /**
   * LOW LEVEL FUNCTIONS
   */


  /**
   * todo what happens when the token expires?
   *
   * Create OAuth2 Client
   *
   * @returns {Promise<OAuth2Client>}
   */
  async createOAuth2Client() {
    console.log(`${this._errorLogPrefix}Beginning createOAuth2Client`);
    // let oAuth2Client = new google.auth.OAuth2(this._clientId, this._clientSecret, this._redirectURI) // todo redirectURI not needed?
    let oAuth2Client = new google.auth.OAuth2(this._clientId, this._clientSecret)
    oAuth2Client.setCredentials({
      access_token: this._accessToken, // todo works without this
      refresh_token: this._refreshToken,
      // scope: this._scope, // todo needed?
      // token_type: 'Bearer', // todo needed?
      // expiry_date:  1234567890 // todo needed?
    });
    console.log(`${this._errorLogPrefix}Finishing createOAuth2Client`);
    return oAuth2Client;
  }

  // used for testing
  throwError() {
    throw new GoogleIntegrationError();
  }

}

module.exports = GoogleUtilities;
