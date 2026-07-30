import bcrypt from "bcrypt";
import {
	PLAN_PRICES,
	Subscription,
	SubscriptionPlan,
	SubscriptionStatus,
} from "../models/Subscription.js";
import { User } from "../models/User.js";
import { logger } from "../utils/logger.js";
import { connectToDatabase, disconnectFromDatabase } from "./db.js";

async function seed() {
	try {
		await connectToDatabase();

		logger.info("Seeding database...");

		await Subscription.deleteMany({});
		await User.deleteMany({});

		const hashedPassword = await bcrypt.hash("Password@123", 10);

		const users = await User.create([
			{
				name: "John Doe",
				email: "john@example.com",
				password: hashedPassword,
			},
			{
				name: "Jane Smith",
				email: "jane@example.com",
				password: hashedPassword,
			},
			{
				name: "Alice Johnson",
				email: "alice@example.com",
				password: hashedPassword,
			},
			{
				name: "Bob Wilson",
				email: "bob@example.com",
				password: hashedPassword,
			},
		]);

		await Subscription.create([
			{
				userId: users[0]._id,
				planName: SubscriptionPlan.BASIC,
				amount: PLAN_PRICES[SubscriptionPlan.BASIC],
				status: SubscriptionStatus.ACTIVE,
				startDate: new Date(),
			},
			{
				userId: users[1]._id,
				planName: SubscriptionPlan.STANDARD,
				amount: PLAN_PRICES[SubscriptionPlan.STANDARD],
				status: SubscriptionStatus.ACTIVE,
				startDate: new Date(),
			},
			{
				userId: users[2]._id,
				planName: SubscriptionPlan.PREMIUM,
				amount: PLAN_PRICES[SubscriptionPlan.PREMIUM],
				status: SubscriptionStatus.PAUSED,
				startDate: new Date(),
			},
			{
				userId: users[3]._id,
				planName: SubscriptionPlan.ENTERPRISE,
				amount: PLAN_PRICES[SubscriptionPlan.ENTERPRISE],
				status: SubscriptionStatus.CANCELLED,
				startDate: new Date(),
			},
		]);

		logger.info("Database seeded successfully");
	} catch (err) {
		logger.error(err);
	} finally {
		await disconnectFromDatabase();
	}
}

seed();
