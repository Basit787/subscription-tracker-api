import { afterAll, afterEach, beforeAll } from "vitest";
import { clearDB, connectDB, disconnectDB } from "./helpers";

beforeAll(async () => {
	await connectDB();
});

afterEach(async () => {
	await clearDB();
});

afterAll(async () => {
	await disconnectDB();
});
