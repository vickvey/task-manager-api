configDotenv()
import { configDotenv } from "dotenv";
import { connectDB } from "./db/memoryDb.js";
import { createApp } from "./server.js"
import logger from "./utils/logger.js"
import swaggerDocs from "./swagger.js";

const app = createApp();
const port = process.env.PORT;

connectDB().then(() => {
  try {
    app.listen(port, () => {
      logger.info(`==> Server started on port ${port} ...`);
    });

    swaggerDocs(app)
  } catch (error) {
    console.log('Cannot connect to the server', error)
  }
}).catch(error => {
  console.log('Invalid database connection...!', error)
})
