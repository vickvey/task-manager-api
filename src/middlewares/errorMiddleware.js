import logger from "../utils/logger.js";
import { apiError } from "../utils/apiError.js";

export default function errorHandler(err, req, res, next) {
  logger.error("Global General Error", "Something Gone Wrong");
  return apiError(res, 500, false, "Internal Server Error");
}
