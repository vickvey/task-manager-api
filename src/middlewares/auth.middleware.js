import ApiError from "../utils/ApiError.js";

export function authenticate(req, res, next) {
  if (!req.session?.userId) {
    return next(new ApiError(401, "Unauthorized"));
  }

  req.user = { id: req.session.userId };
  next();
}
