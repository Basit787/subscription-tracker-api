import { Redis } from "ioredis";
import { logger } from "../utils/logger.js";
import { env } from "./env.js";

export const redisClient = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

redisClient.on("error", (error: Error) => {
  logger.error({ err: error }, "Redis connection error");
});
