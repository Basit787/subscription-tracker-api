import type { Request, Response } from "express";
import { ApiError } from "../errors/api-error.js";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { clearAuthCookies, setAuthCookies } from "../utils/cookies.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { compareRefreshToken, hashRefreshToken } from "../utils/password.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	const existingUser = await User.findOne({ email });

	if (existingUser) {
		throw new ApiError(409, "User already exists");
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	const accessToken = generateAccessToken(user.id);
	const refreshToken = generateRefreshToken(user.id);

	user.refreshToken = refreshToken;
	await user.save();

	setAuthCookies(res, accessToken, refreshToken);

	res.status(201).json({
		message: "User registered successfully",
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
		},
	});
});

export const login = asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email }).select("+password +refreshToken");

	if (!user) {
		throw new ApiError(401, "Invalid credentials");
	}

	const isPasswordCorrect = await user.isPasswordCorrect(password);

	if (!isPasswordCorrect) {
		throw new ApiError(401, "Invalid credentials");
	}

	const accessToken = generateAccessToken(user.id);
	const refreshToken = generateRefreshToken(user.id);

	user.refreshToken = await hashRefreshToken(refreshToken);
	await user.save();

	setAuthCookies(res, accessToken, refreshToken);

	res.status(200).json({
		message: "Login successful",
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
		},
	});
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
	const token = req.cookies?.refreshToken;

	if (!token) {
		throw new ApiError(401, "Refresh token is missing");
	}

	const payload = verifyRefreshToken(token);

	const user = await User.findById(payload.sub).select("+refreshToken");

	if (!user?.refreshToken) {
		throw new ApiError(401, "Invalid refresh token");
	}

	const isRefreshTokenValid = await compareRefreshToken(token, user.refreshToken);

	if (!isRefreshTokenValid) {
		throw new ApiError(401, "Refresh token mismatch");
	}

	const accessToken = generateAccessToken(user.id);
	const refreshToken = generateRefreshToken(user.id);

	user.refreshToken = await hashRefreshToken(refreshToken);
	await user.save();

	setAuthCookies(res, accessToken, refreshToken);

	res.status(200).json({
		message: "Token refreshed successfully",
	});
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
	const user = res.locals.user;

	if (!user) {
		throw new ApiError(401, "Unauthorized");
	}

	await User.findByIdAndUpdate(user.id, {
		refreshToken: null,
	});

	clearAuthCookies(res);

	res.sendStatus(204);
});

export const currentUser = asyncHandler(async (_req: Request, res: Response) => {
	const user = res.locals.user;

	if (!user) {
		throw new ApiError(401, "Unauthorized");
	}

	res.status(200).json({
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		},
	});
});
