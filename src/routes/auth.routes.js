import { Router } from "express";

const router = Router()


/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Health check
 *     description: Returns server health status
 *     tags:
 *       - Auth
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
router.post('/register', (_req, res) => {
  res.send('TODO')
})



// login user
router.post('/login', (_req, res) => {
  res.send('TODO')
})


// logout user
router.post('/logout', (_req, res) => {
  res.send('TODO')
})

export default router; // authRouter
