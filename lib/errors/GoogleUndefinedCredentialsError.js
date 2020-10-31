class GoogleUndefinedCredentialsError extends Error {
  constructor (message) {
    super(message);
    this.name = 'GoogleUndefinedCredentialsError';
  }
}

module.exports = GoogleUndefinedCredentialsError;
