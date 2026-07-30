import mongoose from "mongoose";
import { logger } from "../utils/logger.js";
import { env } from "./env.js";

let isConnected = false;

export const connectToDatabase = async () => {
	if (isConnected) {
		return;
	}

	const uri = env.MONGODB_URI;

	if (!uri) {
		throw new Error("MONGODB_URI environment variable is not set");
	}

	try {
		await mongoose.connect(uri);
		isConnected = true;
		logger.info("MongoDB connected");
	} catch (error) {
		logger.warn({ err: error }, "MongoDB unavailable, continuing without persistence");
	}
};
