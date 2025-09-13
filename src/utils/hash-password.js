import argon2 from "argon2";

function hashPassword(password) {
  return argon2.hash(password);
}

function verifyPassword(actualPassword, hashedPassword) {
  return argon2.verify(hashedPassword, actualPassword);
}

export { hashPassword, verifyPassword };
