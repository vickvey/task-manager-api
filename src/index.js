configDotenv()
import { configDotenv } from "dotenv";
import { connectDB } from "./db/memoryDb.js";
import createServer from "./server.js"
import logger from "./utils/logger.js"

const server = createServer();
const port = process.env.PORT;

connectDB().then(() => {
  server.listen(port, () => {
    logger.info(`==> Server started on port ${port} ...`);
  });
})
