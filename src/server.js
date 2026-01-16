import express from "express";
import cors from "cors";
import { apiResponse } from "./utils/apiResponse.js";
import logger from "./utils/logger.js";
import morgan from "morgan";

function setupMiddlewares(app) {
  app.use(
    cors({
      origin: "*",
      methods: "GET, POST",
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  app.use(express.json({ limit: "8kb" }));
  app.use(express.urlencoded({ extended: true, limit: "15kb" }));
  app.use(morgan('dev'))
}

function setupRoutes(app) {
  // Public Routes
  app.get("/", (_req, res) => {
    return apiResponse(res, 200, true, "Hey! The server is running ...");
  });

  // DEV: Only
  if (process.env.NODE_ENV === "development") {
    app.get("/throw-error", (_req, _res) => {
      logger.error("Broken Error");
      throw new Error("Broken");
    });
  }

  // app.use("/api/v1/auth", authRouter);

  // Private Routes
  // app.use("/api/v1/tasks", authenticate, tasksRouter);
  // app.use("/api/v1/categories", authenticate, categoriesRouter);

  // app.use("/api/v1/admin", adminRouter); // (Optional)
  // app.use("/api/v1/seed", seedDatabase);

  // Global Error Handler
  // app.use(errorHandler); // Using Currently Default Express Global Error Handler
}

function createServer() {
  const app = express();
  setupMiddlewares(app)
  setupRoutes(app);
  return app;
}

export default createServer;
