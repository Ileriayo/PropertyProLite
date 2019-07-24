class ErrorHandler {
  static async errorHandler404(req, res) {
    return res.status(404).json({
      status: 'error',
      error: 'Resource not found',
    });
  }

  // static async errorHandler404(req, res, next) {
  //   const error = {
  //     message: 'Resource not found',
  //     status: 404,
  //   };
  //   return next(error);
  // }

  // static async errorHandler500(error, req, res, next) {
  //   return res.status(error.status || 500).json({
  //     status: 'error',
  //     error: error.message,
  //   });
  // }
}

export default ErrorHandler;
