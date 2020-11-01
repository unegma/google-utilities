const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
require('dotenv').config();
const nock = require('nock');
const { GoogleUtilities } = require('../lib');
const GoogleIntegrationError = require('../lib/errors/GoogleIntegrationError');

describe('Google Utilities Test', () => {
  let gUtilities;
  beforeEach(function() {
    gUtilities = new GoogleUtilities(
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_REDIRECT_URI,
        process.env.GOOGLE_ACCESS_TOKEN,
        process.env.GOOGLE_REFRESH_TOKEN,
        undefined, // if this is null, it will be null, if undefined, it will take the default value
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

  it('should get a doc id', async () => {
    let result = await gUtilities.getDoc(process.env.GOOGLE_TEST_DOC_ID);
    console.log(`The title of the document is: ${result.data.title}`);
  });


});
