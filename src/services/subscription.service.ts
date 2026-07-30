import { ApiError } from "../errors/api-error.js";
import { User } from "../models/User.js";
import {
	type ISubscription,
	PLAN_PRICES,
	Subscription,
	type SubscriptionStatus,
} from "../models/Subscription.js";
import { validateObjectId } from "../utils/validateObjectId.js";

export const createSubscription = async (data: ISubscription) => {
	validateObjectId(data.userId.toString(), "user ID");

	const user = await User.findById(data.userId);

	if (!user) {
		throw new ApiError(404, "User not found");
	}

	const existingSubscription = await Subscription.findOne({
		userId: data.userId,
	});

	if (existingSubscription) {
		throw new ApiError(409, "Subscription already exists for this user");
	}

	return Subscription.create({
		...data,
		amount: PLAN_PRICES[data.planName],
	});
};

export const getSubscriptionById = async (id: string) => {
	validateObjectId(id, "subscription ID");

	const subscription = await Subscription.findById(id).select("-createdAt -updatedAt");

	if (!subscription) {
		throw new ApiError(404, "Subscription not found");
	}

	return subscription;
};

export const getSubscriptions = async (page = 1, limit = 10) => {
	page = Math.max(1, page);
	limit = Math.min(Math.max(1, limit), 100);

	const skip = (page - 1) * limit;

	const [subscriptions, total] = await Promise.all([
		Subscription.find()
			.select("-createdAt -updatedAt")
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit),
		Subscription.countDocuments(),
	]);

	return {
		subscriptions,
		pagination: {
			page,
			limit,
			total,
			totalPages: Math.ceil(total / limit),
		},
	};
};

export const updateSubscriptionStatus = async (id: string, status: SubscriptionStatus) => {
	validateObjectId(id, "subscription ID");

	const subscription = await Subscription.findByIdAndUpdate(
		id,
		{ status },
		{
			new: true,
			runValidators: true,
		},
	).select("-createdAt -updatedAt");

	if (!subscription) {
		throw new ApiError(404, "Subscription not found");
	}

	return subscription;
};
