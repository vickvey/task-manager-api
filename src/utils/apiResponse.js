function apiResponse(success = true, message = "", data = null) {
  return {
    success,
    message,
    data,
  };
}

export default apiResponse;
