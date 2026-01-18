import apiErrorResponse from "../utils/apiErrorResponse.js";
import ApiError from "../utils/ApiError.js";

export default function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return apiErrorResponse(res, err.statusCode, err.message);
  }

  console.error(err); // unexpected errors
  return apiErrorResponse(res, 500, "Internal Server Error");
}
