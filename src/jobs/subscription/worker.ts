import { Worker } from "bullmq";
import { redisConnection } from "../../config/redis.js";
import { Subscription, SubscriptionStatus } from "../../models/Subscription.js";
import { logger } from "../../utils/logger.js";
import { SUBSCRIPTION_JOB } from "./constant.js";

new Worker(
	SUBSCRIPTION_JOB.QUEUE_NAME,
	async () => {
		try {
			const expiryDate = new Date();
			expiryDate.setDate(expiryDate.getDate() - 30);

			const result = await Subscription.updateMany(
				{
					status: SubscriptionStatus.ACTIVE,
					startDate: { $lte: expiryDate },
				},
				{
					status: SubscriptionStatus.EXPIRED,
				},
			);

			logger.info({ modifiedCount: result.modifiedCount }, "Subscription expiry job completed");
		} catch (error) {
			logger.error(error, "Subscription expiry job failed");
			throw error;
		}
	},
	{
		connection: redisConnection,
	},
);
