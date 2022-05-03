const CustomError = require('./custom-error.js');

class NotFoundError extends CustomError {
  constructor(message) {
    super(message || "no book exists");
    this.statusCode = 404;
  }
}
module.exports = NotFoundError;