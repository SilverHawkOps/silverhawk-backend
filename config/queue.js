import { Queue } from "bullmq";
import { redisConnection } from "./redis.js";

const connection = redisConnection;

export const monitorQueue = new Queue("monitoring", { connection });

export const sslQueue = new Queue("sslCheck", { connection });