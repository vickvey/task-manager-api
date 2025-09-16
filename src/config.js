// config.js
import dotenv from "dotenv";
import logger from "./utils/logger.js";

dotenv.config();

export const node_env = process.env.NODE_ENV;
export const port = process.env.PORT;

if (!port || !node_env) {
  logger.error("Environment varibles not set");
  process.exit(1);
}
