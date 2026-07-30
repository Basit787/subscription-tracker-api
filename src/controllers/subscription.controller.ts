import type { Request, Response } from "express";
import * as subscriptionService from "../services/subscription.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createSubscription = asyncHandler(async (req: Request, res: Response) => {
	const subscription = await subscriptionService.createSubscription(req.body);

	res.status(201).json({
		message: "Subscription created successfully",
		subscription,
	});
});

export const getSubscriptionById = asyncHandler(async (req: Request, res: Response) => {
	const subscription = await subscriptionService.getSubscriptionById(req.params.id as string);

	res.status(200).json({
		subscription,
	});
});

export const getSubscriptions = asyncHandler(async (req: Request, res: Response) => {
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;

	const result = await subscriptionService.getSubscriptions(page, limit);

	res.status(200).json(result);
});

export const updateSubscriptionStatus = asyncHandler(async (req: Request, res: Response) => {
	const subscription = await subscriptionService.updateSubscriptionStatus(
		req.params.id as string,
		req.body.status,
	);

	res.status(200).json({
		message: "Subscription updated successfully",
		subscription,
	});
});
