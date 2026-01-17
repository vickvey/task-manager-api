configDotenv()
import { configDotenv } from "dotenv";
import { connectDB } from "./db/memoryDb.js";
import createServer from "./server.js"
import logger from "./utils/logger.js"
import swaggerDocs from "./swagger.js";

const server = createServer();
const port = process.env.PORT;

connectDB().then(() => {
  try {
    server.listen(port, () => {
      logger.info(`==> Server started on port ${port} ...`);
    });

    swaggerDocs(server)
  } catch (error) {
    console.log('Cannot connect to the server', error)
  }
}).catch(error => {
  console.log('Invalid database connection...!', error)
})
