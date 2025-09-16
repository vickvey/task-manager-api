import { configDotenv } from "dotenv";
configDotenv(".env");
import express from "express";
import cors from "cors";
import { apiResponse } from "./utils/apiResponse.js";
import httpLogger from "./middlewares/httpLogger.js";
import logger from "./utils/logger.js";
import { connectDB } from "./db/memoryDb.js";

const PORT = process.env.PORT;
const app = express();

// Must Setup Middlewares
app.use(
  cors({
    origin: "*",
    methods: "GET, POST",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middlewares
app.use(httpLogger);

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
// app.use(authenticate);
// app.use("/api/v1/tasks", tasksRouter);
// app.use("/api/v1/categories", categoriesRouter);

// app.use(authorize);
// app.use("/api/v1/admin", adminRouter); // (Optional)
// app.use("/api/v1/seed", seedDatabase);

// Global Error Handler
// app.use(errorHandler); // Using Currently Default Express Global Error Handler

connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT} ...`);
  });
});
