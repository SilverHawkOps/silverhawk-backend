import { Queue } from "bullmq";
import { redisConnection } from "./redis.js";

const connection = redisConnection;

export const monitorQueue = new Queue("monitoring", { connection });

export const sslQueue = new Queue("sslCheck", { connection });


export const analyticsQueue = new Queue("analyticsQueue", {
  connection: connection,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: false,
    attempts: 3,
    backoff: { type: "exponential", delay: 1000 },
  },
});