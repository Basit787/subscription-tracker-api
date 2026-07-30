import { describe, expect, it } from "vitest";
import { api, loginUser } from "../helpers";

describe("Me API", () => {
	describe("GET /api/auth/me", () => {
		it("should return the authenticated user", async () => {
			const loginResponse = await loginUser();

			const cookies = loginResponse.headers["set-cookie"];

			const response = await api.get("/api/auth/me").set("Cookie", cookies);

			expect(response.status).toBe(200);

			expect(response.body.user).toMatchObject({
				name: "John Doe",
				email: "johndoe@gmail.com",
			});
		});

		it("should return 401 when user is not authenticated", async () => {
			const response = await api.get("/api/auth/me");

			expect(response.status).toBe(401);

			expect(response.body.success).toBe(false);
		});
	});
});
