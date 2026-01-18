import { User } from "../models/User.js";
import { hashPassword, verifyPassword } from "../utils/hash-password.js";
import ApiError from "../utils/ApiError.js";

export async function createUser(email, password) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const passwordHash = await hashPassword(password);
  const user = await User.create({ email, passwordHash });

  return user;
}

export async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await verifyPassword(
    user.passwordHash,
    password
  );

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  return user;
}
