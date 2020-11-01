const GoogleUtilities = require('./GoogleUtilities');

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

}

module.exports = GoogleDocsUtilities;
