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
    gUtilities = new GoogleUtilities(process.env.SLACK_ERROR_LOG);
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

});
