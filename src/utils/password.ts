import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
	return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
	return bcrypt.compare(password, hashedPassword);
}

export async function hashRefreshToken(refreshToken: string): Promise<string> {
	return bcrypt.hash(refreshToken, SALT_ROUNDS);
}

export async function compareRefreshToken(
	refreshToken: string,
	hashedRefreshToken: string,
): Promise<boolean> {
	return bcrypt.compare(refreshToken, hashedRefreshToken);
}
