const Google_API_URL = '';
const fetch = require('node-fetch');
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
   * errorLogPrefix will prefix the start and end of function console logs
   *
   * @param errorLogUrl
   * @param errorLogPrefix
   */
  constructor(errorLogUrl = "", errorLogPrefix = "## ") {
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

  // used for testing
  throwError() {
    throw new GoogleIntegrationError();
  }

}

module.exports = GoogleUtilities;
