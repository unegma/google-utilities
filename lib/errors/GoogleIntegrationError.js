class GoogleIntegrationError extends Error {
  constructor (message) {
    super(message);
    this.name = 'GoogleIntegrationError';
  }
}

module.exports = GoogleIntegrationError;
