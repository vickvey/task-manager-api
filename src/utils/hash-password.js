import argon2 from "argon2";

function hashPassword(password) {
  return argon2.hash(password);
}

function verifyPassword(digest, password) {
  return argon2.verify(digest, password);
}

export { hashPassword, verifyPassword };
