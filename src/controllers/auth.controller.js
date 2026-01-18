import * as AuthService from "../services/auth.service.js";
import logger from "../utils/logger.js";
import apiResponse from "../utils/apiResponse.js";

export async function register(req, res, next) {
  const { email, password } = req.body;

  try {
    const newUser = await AuthService.createUser(email, password);
    const msg = `User ${newUser.email} Created Successfully`;

    logger.info(msg);
    return apiResponse(res, 201, true, msg, {});
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const loggedInUser = await AuthService.loginUser(email, password);

    req.session.userId = loggedInUser.id;
    const msg = `User ${loggedInUser.email} Logged In Successfully`;

    return apiResponse(res, 200, true, msg, {});
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res, next) {
  try {
    if (!req.session || !req.session.userId) {
      return apiResponse(res, 200, true, "User session doesn't exist", {});
    }

    req.session = null;
    return apiResponse(res, 200, true, "User Logged out Successfully", {});
  } catch (error) {
    next(error);
  }
}
