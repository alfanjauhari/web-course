function WrongPasswordError(message) {
  this.name = 'WrongPasswordError';
  this.message = message || 'Wrong Password!';
  this.stack = new Error().stack;
}

WrongPasswordError.prototype = Object.create(Error.prototype);
WrongPasswordError.prototype.constructor = WrongPasswordError;

module.exports = WrongPasswordError;
