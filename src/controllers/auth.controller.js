import * as AuthService from "../services/auth.service.js";
import logger from "../utils/logger.js";
import apiResponse from "../utils/apiResponse.js";

export async function register(req, res, next) {
  try {
    const { email, password } = req.body;

    const newUser = await AuthService.createUser(email, password);
    const message = `User ${newUser.email} created successfully`;

    logger.info(message);

    res.status(201).json(
      apiResponse(true, message, null)
    );
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const loggedInUser = await AuthService.loginUser(email, password);

    req.session.userId = loggedInUser.id;

    const message = `User ${loggedInUser.email} logged in successfully`;

    res.status(200).json(
      apiResponse(true, message, null)
    );
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res, next) {
  try {
    if (!req.session?.userId) {
      // This is NOT an error; user is already logged out
      return res.status(200).json(
        apiResponse(true, "User session does not exist", null)
      );
    }

    req.session = null;
    res.clearCookie("connect.sid");

    res.status(200).json(
      apiResponse(true, "User logged out successfully", null)
    );
  } catch (error) {
    next(error);
  }
}
