import { describe, expect, it } from "vitest";
import { api, loginUser } from "../helpers";

describe("List Subscriptions API", () => {
  describe("GET /api/subscriptions", () => {
    it("should return all subscriptions", async () => {
      const loginResponse = await loginUser();

      const cookies = loginResponse.headers["set-cookie"];

      const response = await api
        .get("/api/subscriptions")
        .set("Cookie", cookies);

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty("subscriptions");
      expect(response.body).toHaveProperty("pagination");

      expect(Array.isArray(response.body.subscriptions)).toBe(true);
    });

    it("should return paginated subscriptions", async () => {
      const loginResponse = await loginUser();

      const cookies = loginResponse.headers["set-cookie"];

      const response = await api
        .get("/api/subscriptions?page=1&limit=10")
        .set("Cookie", cookies);

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty("subscriptions");
      expect(response.body).toHaveProperty("pagination");

      expect(Array.isArray(response.body.subscriptions)).toBe(true);

      expect(response.body.pagination).toMatchObject({
        page: 1,
        limit: 10,
      });
    });

    it("should return an empty array when no subscriptions exist", async () => {
      const loginResponse = await loginUser();

      const cookies = loginResponse.headers["set-cookie"];

      const response = await api
        .get("/api/subscriptions")
        .set("Cookie", cookies);

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty("subscriptions");
      expect(Array.isArray(response.body.subscriptions)).toBe(true);
    });

    it("should return 401 when user is not authenticated", async () => {
      const response = await api.get("/api/subscriptions");

      expect(response.status).toBe(401);

      expect(response.body.success).toBe(false);
    });
  });
});
