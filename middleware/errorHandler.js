const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(err.stack);

  if (err.name === 'CastError') {
    error = new ErrorResponse('Page not found', 404);
  }

  if (err.code === 11000) {
    error = new ErrorResponse('Duplicate field value entered', 400);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Something went wrong',
  });
};

module.exports = errorHandler;
