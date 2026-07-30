import { SUBSCRIPTION_JOB } from "./constant.js";
import { subscriptionQueue } from "./queue.js";

export const scheduleSubscriptionJob = async () => {
	await subscriptionQueue.upsertJobScheduler(
		SUBSCRIPTION_JOB.ID,
		{
			every: SUBSCRIPTION_JOB.INTERVAL,
		},
		{
			name: SUBSCRIPTION_JOB.ID,
			data: {},
		},
	);
};
