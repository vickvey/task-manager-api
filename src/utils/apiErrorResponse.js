function apiErrorResponse(
  res,
  statusCode = 400,
  message = "An error occurred",
  error = {}
) {
  return res.status(statusCode).json({
    success: false,
    message,
    error: error instanceof Error ? error.message : error,
  });
}

export default apiErrorResponse;
