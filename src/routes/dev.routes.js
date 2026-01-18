import { Router } from "express";
import logger from "../utils/logger.js";

const router = Router();

/**
 * @openapi
 * /api/throw-error:
 *   get:
 *     summary: Throw a test error (DEV only)
 *     description: |
 *       This endpoint is used **only in development**
 *       to test error handling, logging, and monitoring.
 *     tags:
 *       - Dev
 *     responses:
 *       500:
 *         description: Intentional server error
 */
if (process.env.NODE_ENV === "development") {
  router.get("/throw-error", (_req, _res) => {
    logger.error("Broken Error");
    throw new Error("Broken");
  });
}

// login
router.post('/login', (req, res) => {
  // const { username, password } = req.body;
  // console.log(`Username: ${username} | Password: ${password}`)

  // set the userId in req object
  // req.session.username = username;
  req.session.userId = "alexbiswas";
  console.log(`Session: ${req.session.userId}`)
  res.status(200).json({
    msg: "Login granted!!"
  })
})

// test-login
router.get('/tasks', (req, res) => {
  if (!req.session || req.session.userId !== "alexbiswas") {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  console.log(`User verified!`)
  console.log("Session object:", req.session);
  res.status(200).json({
    data: {
      tasks: ["brush your teeth", "take a bath"]
    }
  })
})

router.get('/logout', (req, res) => {
  if (!req.session) {
    return res.status(200).json({
      msg: "No session found!!"
    })
  }

  req.session = null;
  res.status(200).json({
    msg: "User with username: alexbiswas logged out successfully!"
  })
})


export default router; // devRouter
