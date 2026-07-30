import { Queue } from "bullmq";
import { redisConnection } from "../../config/redis.js";
import { logger } from "../../utils/logger.js";
import { SUBSCRIPTION_JOB } from "./constant.js";

export const subscriptionQueue = new Queue(SUBSCRIPTION_JOB.QUEUE_NAME, {
	connection: redisConnection,
});

subscriptionQueue.on("error", (error) => {
	logger.error(error, "Subscription queue error");
});
