// @ts-check
import mongoose from "mongoose";

/**
 * @typedef {Object} UserDocument
 * @property {string} username
 * @property {string} email
 * @property {string} passwordHash
 * @property {Date} [createdAt] // Optional
 * @property {Date} [updatedAt] // Optional
 * @property {mongoose.Types.ObjectId} [_id] // Optional
 */

/** @type {mongoose.Schema<UserDocument>} */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
    maxLength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

export { User };
