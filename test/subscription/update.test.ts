import { describe, expect, it } from "vitest";
import { api, loginUser } from "../helpers";

describe("Update Subscription API", () => {
	describe("PATCH /api/subscriptions/:id", () => {
		it("should update subscription successfully", async () => {
			const loginResponse = await loginUser();

			const cookies = loginResponse.headers["set-cookie"];
			const userId = loginResponse.body.user.id;

			const createResponse = await api.post("/api/subscriptions").set("Cookie", cookies).send({
				userId,
				planName: "premium",
				status: "active",
				startDate: "2026-07-30",
			});

			const subscriptionId = createResponse.body.subscription._id;

			const response = await api
				.patch(`/api/subscriptions/${subscriptionId}`)
				.set("Cookie", cookies)
				.send({
					status: "paused",
				});

			expect(response.status).toBe(200);

			expect(response.body.subscription.status).toBe("paused");
		});

		it("should return 400 for invalid status", async () => {
			const loginResponse = await loginUser();

			const cookies = loginResponse.headers["set-cookie"];

			const response = await api
				.patch("/api/subscriptions/689000000000000000000000")
				.set("Cookie", cookies)
				.send({
					status: "invalid-status",
				});

			expect(response.status).toBe(400);

			expect(response.body.success).toBe(false);
		});

		it("should return 404 when subscription does not exist", async () => {
			const loginResponse = await loginUser();

			const cookies = loginResponse.headers["set-cookie"];

			const response = await api
				.patch("/api/subscriptions/689000000000000000000000")
				.set("Cookie", cookies)
				.send({
					status: "paused",
				});

			expect(response.status).toBe(404);

			expect(response.body.success).toBe(false);
		});

		it("should return 401 when user is not authenticated", async () => {
			const response = await api.patch("/api/subscriptions/689000000000000000000000").send({
				status: "paused",
			});

			expect(response.status).toBe(401);

			expect(response.body.success).toBe(false);
		});
	});
});
