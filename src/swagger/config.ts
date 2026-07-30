import swaggerJsdoc from "swagger-jsdoc";
import { SubscriptionPlan, SubscriptionStatus } from "../models/Subscription.js";

export const swaggerSpec = swaggerJsdoc({
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Subscription Tracker API",
			version: "1.0.0",
			description: "REST API for Subscription Tracker",
		},

		servers: [
			{
				url: "http://localhost:3000/api",
				description: "Local Development",
			},
		],

		components: {
			securitySchemes: {
				cookieAuth: {
					type: "apiKey",
					in: "cookie",
					name: "accessToken",
				},
			},

			schemas: {
				RegisterRequest: {
					type: "object",
					required: ["name", "email", "password"],
					properties: {
						name: {
							type: "string",
							example: "John Doe",
						},
						email: {
							type: "string",
							format: "email",
							example: "john@example.com",
						},
						password: {
							type: "string",
							format: "password",
							example: "password123",
						},
					},
				},

				LoginRequest: {
					type: "object",
					required: ["email", "password"],
					properties: {
						email: {
							type: "string",
							format: "email",
							example: "john@example.com",
						},
						password: {
							type: "string",
							format: "password",
							example: "password123",
						},
					},
				},

				CreateSubscriptionRequest: {
					type: "object",
					required: ["userId", "planName"],
					properties: {
						userId: {
							type: "string",
							example: "6a6ba24a6e2b980da9bb0516",
							description: "MongoDB User ID",
						},
						planName: {
							type: "string",
							enum: Object.values(SubscriptionPlan),
							example: SubscriptionPlan.PREMIUM,
							description: "Subscription plan",
						},
						status: {
							type: "string",
							enum: Object.values(SubscriptionStatus),
							example: SubscriptionStatus.ACTIVE,
							description: "Subscription status (defaults to active if omitted)",
						},
						startDate: {
							type: "string",
							format: "date",
							example: "2026-07-30",
							description: "Subscription start date (defaults to current date if omitted)",
						},
					},
				},

				UpdateSubscriptionRequest: {
					type: "object",
					required: ["status"],
					properties: {
						status: {
							type: "string",
							enum: Object.values(SubscriptionStatus),
							example: SubscriptionStatus.ACTIVE,
							description: "Updated subscription status",
						},
					},
				},

				Subscription: {
					type: "object",
					properties: {
						_id: {
							type: "string",
							example: "6890d5df54f42cb89f1d1234",
						},
						userId: {
							type: "string",
							example: "6a6ba24a6e2b980da9bb0516",
						},
						planName: {
							type: "string",
							enum: Object.values(SubscriptionPlan),
							example: SubscriptionPlan.PREMIUM,
						},
						amount: {
							type: "number",
							example: 1999,
						},
						status: {
							type: "string",
							enum: Object.values(SubscriptionStatus),
							example: SubscriptionStatus.ACTIVE,
						},
						startDate: {
							type: "string",
							format: "date-time",
							example: "2026-07-30T00:00:00.000Z",
						},
						createdAt: {
							type: "string",
							format: "date-time",
							example: "2026-07-30T10:15:20.000Z",
						},
						updatedAt: {
							type: "string",
							format: "date-time",
							example: "2026-07-30T10:15:20.000Z",
						},
					},
				},
			},
		},
	},

	apis: ["./src/swagger/*.swagger.ts"],
});
