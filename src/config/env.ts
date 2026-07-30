import "dotenv/config";

function required(name: string): string {
	const value = process.env[name];

	if (!value) {
		throw new Error(`${name} environment variable is not set`);
	}

	return value;
}

export const env = {
	// App
	NODE_ENV: process.env.NODE_ENV ?? "development",
	PORT: Number(process.env.PORT ?? 3000),

	// MongoDB
	MONGODB_URI: required("MONGODB_URI"),

	// Redis
	REDIS_URL: required("REDIS_URL"),

	// JWT
	ACCESS_TOKEN_SECRET: required("ACCESS_TOKEN_SECRET"),
	REFRESH_TOKEN_SECRET: required("REFRESH_TOKEN_SECRET"),
} as const;
