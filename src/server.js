import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import responseTime from "response-time";
import logger from "./utils/logger.js";
import apiRouter from "./routes/index.js";
import cookieSession from "cookie-session";
import errorHandler from "./middlewares/error.middleware.js"


export function createApp() {
  const app = express();

  // --------------------
  // CORS
  // --------------------
  app.use(
    cors({
      origin: "http://localhost:3500", // frontend origin
      credentials: true,
      methods: ["GET", "POST"],
    })
  );

  // --------------------
  // Body Parsing
  // --------------------
  app.use(express.json({ limit: "16kb" }));
  app.use(express.urlencoded({ extended: true, limit: "16kb" }));

  // --------------------
  // Logging & Metrics
  // --------------------
  app.use(morgan("dev"));

  app.use(
    responseTime((req, res, time) => {
      if (req.originalUrl.startsWith("/docs")) return;
      if (req.originalUrl === "/favicon.ico") return;

      logger.info("API response time", {
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        durationMs: Number(time.toFixed(2)),
      });
    })
  );


  // --------------------
  // Session Management
  // --------------------
  app.use(cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET || "dev-secret"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))


  // --------------------
  // Security
  // --------------------
  app.use(helmet());

  // --------------------
  // Routes
  // --------------------
  app.use("/api", apiRouter);

  // --------------------
  // Global Error Handler
  // --------------------
  app.use(errorHandler);

  return app;
}
