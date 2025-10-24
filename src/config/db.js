import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./logger.js";

dotenv.config();

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    logger.info("MongoDB already connected");
    return mongoose.connection;
  }

  const options = {
    maxPoolSize: parseInt(process.env.MONGO_POOL_SIZE) || 10,
  };

  let attempts = 0;

  while (attempts < (process.env.MONGO_RETRY_ATTEMPTS || 5)) {
    try {
      await mongoose.connect(process.env.MONGO_URI, options);
      isConnected = true;
      logger.info("MongoDB connected successfully");
      break;
    } catch (err) {
      attempts++;
      logger.error(`MongoDB connection failed (attempt ${attempts}): ${err.message}`);
      await new Promise((res) => setTimeout(res, process.env.MONGO_RETRY_DELAY_MS || 2000));
    }
  }

  if (!isConnected) {
    logger.error("MongoDB connection failed after all retry attempts");
    process.exit(1); // Stop the server if DB connection fails
  }

  return mongoose.connection;
};

export default connectDB;
