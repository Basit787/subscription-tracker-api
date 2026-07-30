import { api } from "./app";

export const registerUser = async () => {
	return api.post("/api/auth/register").send({
		name: "John Doe",
		email: "johndoe@gmail.com",
		password: "Password123",
	});
};

export const loginUser = async () => {
	await registerUser();

	return api.post("/api/auth/login").send({
		email: "johndoe@gmail.com",
		password: "Password123",
	});
};
