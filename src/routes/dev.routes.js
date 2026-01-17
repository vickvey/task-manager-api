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

export default router;
