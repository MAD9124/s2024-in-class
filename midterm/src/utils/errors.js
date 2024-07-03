class ApiError extends Error {
  status = 500;
  constructor(message) {
    super(message);
  }
}

class BadRequestError extends ApiError {
  status = 400;
}

class UnauthorizedError extends ApiError {
  status = 401;
}

class ForbiddenError extends ApiError {
  status = 403;
}

class NotFoundError extends ApiError {
  status = 404;
}

const errorHandler = (err, _req, res, _next) => {
  console.log(err);

  if (err instanceof ApiError) {
    res.status(err.status).json({
      error: {
        message: err.message,
      },
    });
    return;
  }

  res.status(500).json({
    error: {
      message: "Something went wrong",
    },
  });
};

module.exports = {
  ApiError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  errorHandler,
};
