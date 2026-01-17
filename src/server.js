import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import healthRouter from "./routes/health.route.js"
import responseTime from "response-time";
import logger from "./utils/logger.js"
import devRouter from "./routes/dev.routes.js"

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
  app.use(
    responseTime((req, res, time) => {
      // Skip Swagger & static assets
      if (req.originalUrl.startsWith("/docs")) return;
      if (req.originalUrl === "/favicon.ico") return;

      // Log all others
      logger.info("API response time", {
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        durationMs: Number(time.toFixed(2))
      });
    })
  );
  app.use(helmet())
}

function setupRoutes(app) {
  // Public API routes
  app.use("/api", healthRouter)
  if (process.env.NODE_ENV === "development") app.use("/api", devRouter);

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
