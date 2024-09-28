import type { ErrorRequestHandler } from "express";
import ApiError from "../utils/apiError";

const errorHandler: ErrorRequestHandler = (err: ApiError, req, res, next) => {
  const errorStatusCode = err.statusCode || 500;
  res.status(errorStatusCode).json({
    status: errorStatusCode,
    message: err.message,
    data: err.data,
    errors: err.errors,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
