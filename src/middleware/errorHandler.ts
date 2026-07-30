import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ZodError } from "zod";
import { ApiError } from "../errors/api-error.js";
import { logger } from "../utils/logger.js";

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
	if (error instanceof ZodError) {
		return res.status(400).json({
			success: false,
			message: "Validation failed",
			errors: error.issues.map((issue) => ({
				field: issue.path.join("."),
				message: issue.message,
			})),
		});
	}

	if (error instanceof ApiError) {
		return res.status(error.statusCode).json({
			success: false,
			message: error.message,
		});
	}

	if (error instanceof mongoose.Error.CastError) {
		return res.status(400).json({
			success: false,
			message: `Invalid ${error.path}`,
		});
	}

	if (error && typeof error === "object" && "code" in error && error.code === 11000) {
		return res.status(409).json({
			success: false,
			message: "Duplicate resource",
		});
	}

	logger.error(error);

	return res.status(500).json({
		success: false,
		message: "Internal Server Error",
	});
};
