import { describe, expect, it } from "vitest";
import { api, loginUser } from "../helpers";

describe("Create Subscription API", () => {
  describe("POST /api/subscriptions", () => {
    it("should create a subscription successfully", async () => {
      const loginResponse = await loginUser();

      const cookies = loginResponse.headers["set-cookie"];
      const userId = loginResponse.body.user.id;

      const response = await api
        .post("/api/subscriptions")
        .set("Cookie", cookies)
        .send({
          userId,
          planName: "premium",
          status: "active",
          startDate: "2026-07-30",
        });

      expect(response.status).toBe(201);

      expect(response.body).toMatchObject({
        message: "Subscription created successfully",
      });

      expect(response.body.subscription).toMatchObject({
        userId,
        planName: "premium",
        status: "active",
        amount: 1999,
      });

      expect(response.body.subscription).toHaveProperty("_id");
    });

    it("should return 401 when user is not authenticated", async () => {
      const response = await api.post("/api/subscriptions").send({
        userId: "507f191e810c19729de860ea",
        planName: "premium",
        status: "active",
        startDate: "2026-07-30",
      });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it("should return 400 for invalid request body", async () => {
      const loginResponse = await loginUser();

      const cookies = loginResponse.headers["set-cookie"];

      const response = await api
        .post("/api/subscriptions")
        .set("Cookie", cookies)
        .send({
          planName: "invalid-plan",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should return 409 when subscription already exists", async () => {
      const loginResponse = await loginUser();

      const cookies = loginResponse.headers["set-cookie"];
      const userId = loginResponse.body.user.id;

      const body = {
        userId,
        planName: "premium",
        status: "active",
        startDate: "2026-07-30",
      };

      await api.post("/api/subscriptions").set("Cookie", cookies).send(body);

      const response = await api
        .post("/api/subscriptions")
        .set("Cookie", cookies)
        .send(body);

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
    });
  });
});
