function apiError(
  res,
  statusCode = 400,
  success = false,
  message = "An error occurred",
  error = {}
) {
  const errorResponse = {
    success,
    message,
    error: error instanceof Error ? error.message : error,
  };

  return res.status(statusCode).json(errorResponse);
}

export { apiError };
