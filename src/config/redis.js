import IORedis from "ioredis";
import { CONFIG } from "./config.js";
import logger from "./logger.js";

const REDIS_OPTIONS = {
  maxRetriesPerRequest: null, // limit retries per command
  enableOfflineQueue: true, // queue commands while reconnecting
  reconnectOnError: (err) => {
    // reconnect on specific errors
    const targetErrors = ["READONLY", "ECONNRESET", "ETIMEDOUT"];
    if (targetErrors.some((e) => err.message.includes(e))) {
      return true;
    }
    return false;
  },
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000); // exponential backoff
    return delay;
  },
  // Optional: connection timeout
  connectTimeout: 10000,
};

export const redisConnection = new IORedis(CONFIG.REDIS_URL, REDIS_OPTIONS);

// 🔎 Connection Events
redisConnection.on("connect", () => {
  logger.info("Redis connected");
});

redisConnection.on("ready", () => {
  logger.info("Redis connection is ready to use");
});

redisConnection.on("error", (err) => {
  logger.error("Redis connection error:", err);
});

redisConnection.on("close", () => {
  logger.warn("Redis connection closed");
});

redisConnection.on("reconnecting", (delay) => {
  logger.info(`Redis reconnecting in ${delay}ms...`);
});

// 🔒 Graceful shutdown
// const shutdownRedis = async () => {
//   try {
//     await redisConnection.quit();
//     logger.info("Redis connection closed gracefully");
//   } catch (err) {
//     logger.error("Error closing Redis connection", err);
//   }
// };

// process.on("SIGINT", shutdownRedis);
// process.on("SIGTERM", shutdownRedis);

export default redisConnection;
