import app from "./config/app.js";
import dotenv from "dotenv";
import logger from "./config/logger.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB(); // ensure DB is connected before starting the server

  app.listen(PORT, () => {
    logger.info(
      `Silverhawk APM backend running on port ${PORT} in ${process.env.NODE_ENV} mode`
    );
  });
};

startServer();
