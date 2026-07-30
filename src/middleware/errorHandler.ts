import type { ErrorRequestHandler } from "express";
import { ApiError } from "../errors/api-error.js";
import { logger } from "../utils/logger.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.error(
    {
      message: err.message,
      stack: err.stack,
    },
    "Unhandled Error",
  );

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
