import { describe, expect, it } from "vitest";
import { api, loginUser } from "../helpers";

describe("Get Subscriptions API", () => {
	describe("GET /api/subscriptions", () => {
		it("should return all subscriptions", async () => {
			const loginResponse = await loginUser();

			const cookies = loginResponse.headers["set-cookie"];
			const userId = loginResponse.body.user.id;

			await api.post("/api/subscriptions").set("Cookie", cookies).send({
				userId,
				planName: "premium",
				status: "active",
				startDate: "2026-07-30",
			});

			const response = await api.get("/api/subscriptions").set("Cookie", cookies);

			expect(response.status).toBe(200);

			expect(Array.isArray(response.body.subscriptions)).toBe(true);
			expect(response.body).toHaveProperty("pagination");
		});

		it("should support pagination", async () => {
			const loginResponse = await loginUser();

			const cookies = loginResponse.headers["set-cookie"];

			const response = await api.get("/api/subscriptions?page=1&limit=10").set("Cookie", cookies);

			expect(response.status).toBe(200);

			expect(response.body).toHaveProperty("subscriptions");
			expect(response.body).toHaveProperty("pagination");

			expect(response.body.pagination).toMatchObject({
				page: 1,
				limit: 10,
			});
		});

		it("should return 401 when user is not authenticated", async () => {
			const response = await api.get("/api/subscriptions");

			expect(response.status).toBe(401);
			expect(response.body.success).toBe(false);
		});
	});

	describe("GET /api/subscriptions/:id", () => {
		it("should return a subscription by id", async () => {
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

			const response = await api.get(`/api/subscriptions/${subscriptionId}`).set("Cookie", cookies);

			expect(response.status).toBe(200);

			expect(response.body.subscription._id).toBe(subscriptionId);

			expect(response.body.subscription).toMatchObject({
				planName: "premium",
				status: "active",
			});
		});

		it("should return 404 for non-existing subscription", async () => {
			const loginResponse = await loginUser();

			const cookies = loginResponse.headers["set-cookie"];

			const response = await api
				.get("/api/subscriptions/689000000000000000000000")
				.set("Cookie", cookies);

			expect(response.status).toBe(404);
			expect(response.body.success).toBe(false);
		});

		it("should return 401 when user is not authenticated", async () => {
			const response = await api.get("/api/subscriptions/689000000000000000000000");

			expect(response.status).toBe(401);
			expect(response.body.success).toBe(false);
		});
	});
});
