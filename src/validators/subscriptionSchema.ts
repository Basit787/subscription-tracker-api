import { z } from "zod";
import { SubscriptionPlan, SubscriptionStatus } from "../models/Subscription.js";

export const createSubscriptionSchema = z.object({
	userId: z.string().trim().min(1, "User ID is required"),
	planName: z
		.string()
		.trim()
		.toLowerCase()
		.pipe(z.enum(SubscriptionPlan))
		.default(SubscriptionPlan.BASIC),
	status: z.enum(SubscriptionStatus).default(SubscriptionStatus.ACTIVE),
	startDate: z.coerce
		.date({
			error: "Invalid start date",
		})
		.default(() => new Date()),
});

export const updateSubscriptionSchema = z.object({
	status: z.enum(SubscriptionStatus),
});

export const idParamSchema = z.object({
	id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid subscription ID"),
});
