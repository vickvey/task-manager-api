import { Router } from "express";


const router = Router();

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Health check
 *     description: Returns server health status
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy :)"
  });
});

export default router; // healthRouter
