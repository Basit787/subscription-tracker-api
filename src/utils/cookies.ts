import type { Response } from "express";

const cookieOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "lax" as const,
	path: "/",
};

const accessCookieOptions = {
	...cookieOptions,
	maxAge: 15 * 60 * 1000, // 15 minutes
};

const refreshCookieOptions = {
	...cookieOptions,
	maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string): void => {
	res.cookie("accessToken", accessToken, accessCookieOptions);

	res.cookie("refreshToken", refreshToken, refreshCookieOptions);
};

export const clearAuthCookies = (res: Response): void => {
	res.clearCookie("accessToken", cookieOptions);
	res.clearCookie("refreshToken", cookieOptions);
};
