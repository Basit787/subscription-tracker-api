import "./subscription/worker.js";
import { scheduleSubscriptionJob } from "./subscription/job.js";

export const initializeJobs = async () => {
	await scheduleSubscriptionJob();
};
