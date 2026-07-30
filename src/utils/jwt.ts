import jwt, { type JwtPayload, type Secret, type SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";

export interface TokenPayload extends JwtPayload {
	sub: string;
}

const accessTokenOptions: SignOptions = {
	algorithm: "HS256",
	expiresIn: "15m",
};

const refreshTokenOptions: SignOptions = {
	algorithm: "HS256",
	expiresIn: "7d",
};

export const generateAccessToken = (userId: string): string => {
	return jwt.sign({ sub: userId }, env.ACCESS_TOKEN_SECRET as Secret, accessTokenOptions);
};

export const generateRefreshToken = (userId: string): string => {
	return jwt.sign({ sub: userId }, env.REFRESH_TOKEN_SECRET as Secret, refreshTokenOptions);
};

export const verifyAccessToken = (token: string): TokenPayload => {
	return jwt.verify(token, env.ACCESS_TOKEN_SECRET as Secret) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
	return jwt.verify(token, env.REFRESH_TOKEN_SECRET as Secret) as TokenPayload;
};
