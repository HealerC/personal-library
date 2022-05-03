const CustomError = require('../errors/custom-error.js');

const errorHandler = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Something went wrong, try again later'
  }

  /* Invalid ObjectID */
  if (err.name === 'CastError') {
    customError.statusCode = 400;
    customError.message = "ObjectID provided is invalid"
  }

  /* e.g. Characters more than minlength, required fields not sent */
  if (err.name === 'ValidationError') {
    customError.statusCode = 400;
    customError.message = "required field(s) missing";
  }
  
  // ~Default error code because of fcc testing~
  
  return res.status(customError.statusCode).send(customError.message);
}
module.exports = errorHandler;