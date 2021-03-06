const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
require('dotenv').config();
const nock = require('nock');
const { GoogleUtilities, GoogleDocsUtilities } = require('../lib');
const GoogleIntegrationError = require('../lib/errors/GoogleIntegrationError');

describe('Google Utilities Test', () => {
  let gUtilities; let gDocsUtilities;
  beforeEach(function() {
    // gUtilities = new GoogleUtilities(
    //     process.env.GOOGLE_CLIENT_SECRET,
    //     process.env.GOOGLE_CLIENT_ID,
    //     process.env.GOOGLE_REDIRECT_URI,
    //     process.env.GOOGLE_ACCESS_TOKEN,
    //     process.env.GOOGLE_REFRESH_TOKEN,
    //     undefined, // if this is null, it will be null, if undefined, it will take the default value
    //     process.env.SLACK_ERROR_LOG
    // );

    gUtilities = new GoogleUtilities(
        process.env.GOOGLE_SERVICE_ACCOUNT,
        process.env.GOOGLE_API_PRIVATE_KEY,
        process.env.SLACK_ERROR_LOG
    );

    gDocsUtilities = new GoogleDocsUtilities(
        process.env.GOOGLE_SERVICE_ACCOUNT,
        process.env.GOOGLE_API_PRIVATE_KEY,
        process.env.SLACK_ERROR_LOG
    );
  });

  afterEach(function() {
  });

  it('should create an instance of GoogleUtilities', () => {
    expect(gUtilities).to.be.instanceOf(GoogleUtilities);
    expect(() => {
      gUtilities.throwError('Message')
    }).to.throw(GoogleIntegrationError);
  });

  it('should create an instance of a GoogleIntegrationError', () => {
    const error = new GoogleIntegrationError('Error');
    expect(error.message).to.equal('Error');
  });

  it('should get a doc title', async () => {
    let result = await gDocsUtilities.getDocTitle(process.env.GOOGLE_TEST_DOC_ID);
    console.log(`The title of the document is: ${result}`);
  });

  it('should get a doc body', async () => {
    let result = await gDocsUtilities.getDocBody(process.env.GOOGLE_TEST_DOC_ID);
    console.log(`${result}`);
  });

  // it('should write to a doc body', async () => {
  //   let result = await gDocsUtilities.writeToDocBody(process.env.GOOGLE_TEST_DOC_ID);
  //   console.log(`${result}`);
  // });

  it('should create a doc', async () => {
    let result = await gDocsUtilities.createDoc(`TestDoc${Date.now()}`, 'This is the body', "unegma.com");
    console.log(`Doc URL: ${result}`);
  });

});
