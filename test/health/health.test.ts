import { describe, expect, it } from "vitest";
import { api } from "../helpers";

describe("Health API", () => {
  describe("GET /api/health", () => {
    it("should return application health status", async () => {
      const response = await api.get("/api/health");

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        status: "ok",
      });
    });
  });
});
