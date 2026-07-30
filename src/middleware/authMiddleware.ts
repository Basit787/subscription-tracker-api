import type { NextFunction, Request, Response } from "express";
import { User } from "../models/User.js";
import { ApiError } from "../errors/api-error.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authMiddleware = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const token = req.cookies?.accessToken;

		if (!token) {
			throw new ApiError(401, "Authentication required");
		}

		const payload = verifyAccessToken(token);

		const user = await User.findById(payload.sub);

		if (!user) {
			throw new ApiError(401, "User not found");
		}

		res.locals.user = user;
		res.locals.userId = user.id;

		next();
	},
);
