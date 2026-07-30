export const SUBSCRIPTION_JOB = {
	QUEUE_NAME: "subscription-queue",
	ID: "subscription-check",
	INTERVAL: 5 * 60 * 1000, // 5 minutes
} as const;
