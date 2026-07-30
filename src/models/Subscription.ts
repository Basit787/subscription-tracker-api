import { Schema, model, type Types } from "mongoose";

export enum SubscriptionPlan {
	BASIC = "basic",
	STANDARD = "standard",
	PREMIUM = "premium",
	ENTERPRISE = "enterprise",
}

export const PLAN_PRICES: Record<SubscriptionPlan, number> = {
	[SubscriptionPlan.BASIC]: 499,
	[SubscriptionPlan.STANDARD]: 999,
	[SubscriptionPlan.PREMIUM]: 1999,
	[SubscriptionPlan.ENTERPRISE]: 4999,
};

export enum SubscriptionStatus {
	ACTIVE = "active",
	PAUSED = "paused",
	CANCELLED = "cancelled",
	EXPIRED = "expired",
}

export interface ISubscription {
	userId: Types.ObjectId;
	planName: SubscriptionPlan;
	amount: number;
	status: SubscriptionStatus;
	startDate: Date;
}

const subscriptionSchema = new Schema<ISubscription>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			unique: true,
		},
		planName: {
			type: String,
			enum: Object.values(SubscriptionPlan),
			required: true,
		},
		amount: {
			type: Number,
			required: true,
			min: 0,
		},
		status: {
			type: String,
			enum: Object.values(SubscriptionStatus),
			required: true,
			default: SubscriptionStatus.ACTIVE,
		},
		startDate: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

export const Subscription = model<ISubscription>("Subscription", subscriptionSchema);
