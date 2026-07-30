import { Redis } from "ioredis";
import { logger } from "../utils/logger.js";
import { env } from "./env.js";

export const redisConnection = new Redis(env.REDIS_URL, {
	maxRetriesPerRequest: null,
});

redisConnection.on("error", (error: Error) => {
	logger.error({ err: error }, "Redis connection error");
});
