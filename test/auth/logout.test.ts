import { describe, expect, it } from "vitest";
import { api, loginUser } from "../helpers";

describe("Logout API", () => {
	describe("POST /api/auth/logout", () => {
		it("should logout successfully", async () => {
			const loginResponse = await loginUser();

			const cookies = loginResponse.headers["set-cookie"];

			const response = await api.post("/api/auth/logout").set("Cookie", cookies);

			expect(response.status).toBe(204);

			// Cookie should still be cleared
			expect(response.headers["set-cookie"]).toBeDefined();
		});

		it("should return 401 when user is not authenticated", async () => {
			const response = await api.post("/api/auth/logout");

			expect(response.status).toBe(401);
			expect(response.body.success).toBe(false);
		});
	});
});
