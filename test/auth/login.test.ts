import { describe, expect, it } from "vitest";
import { api, registerUser } from "../helpers";

describe("Login API", () => {
	describe("POST /api/auth/login", () => {
		it("should login successfully with valid credentials", async () => {
			await registerUser();

			const response = await api.post("/api/auth/login").send({
				email: "johndoe@gmail.com",
				password: "Password123",
			});

			expect(response.status).toBe(200);

			expect(response.body).toMatchObject({
				message: "Login successful",
				user: {
					name: "John Doe",
					email: "johndoe@gmail.com",
				},
			});

			expect(response.headers["set-cookie"]).toBeDefined();
		});

		it("should return 401 for invalid password", async () => {
			await registerUser();

			const response = await api.post("/api/auth/login").send({
				email: "johndoe@gmail.com",
				password: "WrongPassword123",
			});

			expect(response.status).toBe(401);

			expect(response.body.message).toBeDefined();
		});

		it("should return 401 when user does not exist", async () => {
			const response = await api.post("/api/auth/login").send({
				email: "unknown@gmail.com",
				password: "Password123",
			});

			expect(response.status).toBe(401);

			expect(response.body.message).toBeDefined();
		});

		it("should return 400 for invalid request body", async () => {
			const response = await api.post("/api/auth/login").send({
				email: "invalid-email",
				password: "",
			});

			expect(response.status).toBe(400);

			expect(response.body.message).toBeDefined();
		});
	});
});
