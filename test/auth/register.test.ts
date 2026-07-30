import { describe, expect, it } from "vitest";
import { api } from "../helpers";

describe("Register API", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user successfully", async () => {
      const response = await api.post("/api/auth/register").send({
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "Password123",
      });

      expect(response.status).toBe(201);

      expect(response.body).toMatchObject({
        message: "User registered successfully",
        user: {
          name: "John Doe",
          email: "johndoe@gmail.com",
        },
      });
    });

    it("should return 409 when email already exists", async () => {
      await api.post("/api/auth/register").send({
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "Password123",
      });

      const response = await api.post("/api/auth/register").send({
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "Password123",
      });

      expect(response.status).toBe(409);

      expect(response.body.success).toBe(false);
    });

    it("should return 400 for invalid request body", async () => {
      const response = await api.post("/api/auth/register").send({
        name: "",
        email: "invalid-email",
        password: "",
      });

      expect(response.status).toBe(400);

      expect(response.body.success).toBe(false);
    });
  });
});
