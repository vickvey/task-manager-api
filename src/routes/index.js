import { Router } from "express";
import healthRouter from "./health.route.js";
import devRouter from "./dev.routes.js";
import authRouter from "./auth.routes.js"


const router = Router();

// Public routes
router.use('/dev', devRouter);

router.use("/", healthRouter);
router.use("/auth", authRouter);

// Private routes
// router.use("/tasks", tasksRouter);

// Future
// router.use("/v1/admin", adminRouter);

export default router; // indexRouter
