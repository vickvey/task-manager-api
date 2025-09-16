function apiResponse(
  res,
  statusCode = 200,
  success = true,
  message = "",
  data = {}
) {
  const response = {
    success,
    message,
    data,
  };
  return res.status(statusCode).json(response);
}

export { apiResponse };
