import { Router } from "express";
import * as AuthController from "../controllers/auth.controller.js"

const router = Router()


/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user and store it in the database
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User user@example.com Created Successfully
 *                 data:
 *                   type: object
 *       409:
 *         description: User already exists
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post("/register", AuthController.register);


/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate user credentials and create a login session (JWT or session cookie)
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         headers:
 *           Set-Cookie:
 *             description: Session or JWT token stored in HTTP-only cookie
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User user@example.com Logged In Successfully
 *                 data:
 *                   type: object
 *       401:
 *         description: Invalid email or password
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post("/login", AuthController.login);


/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Logout the currently authenticated user and clear the session or JWT cookie
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         headers:
 *           Set-Cookie:
 *             description: Clears the authentication cookie
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User Logged out Successfully
 *                 data:
 *                   type: object
 *       401:
 *         description: User not authenticated
 *       500:
 *         description: Internal server error
 */
router.post("/logout", AuthController.logout);

export default router; // authRouter
