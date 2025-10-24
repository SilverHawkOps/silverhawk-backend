import { Queue, Worker } from "bullmq";
import redisConnection from "../config/redis.js";

// Worker to process analytics events
export const analyticsWorker = new Worker(
  "analyticsQueue",
  async (job) => {
    const event = job.data;
    console.log("Processing analytics event:", event);
    // TODO: Insert into TimescaleDB or log for batch processing
  },
  { connection: redisConnection, concurrency: 5 }
);