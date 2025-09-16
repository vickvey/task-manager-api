import { Router } from "express";
import validateData from "../middlewares/validationMiddleware.js";
import { userLoginSchema, userRegisterSchema } from "../schema/auth.schema.js";

const router = Router();

// TODO:
// router.post("/register", validateData(userRegisterSchema), registerUser);

// router.post("/login", validateData(userLoginSchema), loginUser);

// router.post("/logout", logoutUser);

export default router; // authRouter
