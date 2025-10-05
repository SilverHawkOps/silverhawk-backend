import logger from "../config/logger.js";

function globalErrorHandler(err, req, res, next) {
  logger.error(err);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
}

export default globalErrorHandler;
