import { model, Schema } from "mongoose";
import { comparePassword, hashPassword } from "../utils/password.js";

export interface IUser {
	name: string;
	email: string;
	password: string;
	refreshToken: string | null;
	createdAt: Date;
	updatedAt: Date;
	isPasswordCorrect(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
			minlength: [2, "Name must be at least 2 characters"],
			maxlength: [100, "Name cannot exceed 100 characters"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [6, "Password must be at least 6 characters"],
			select: false,
		},
		refreshToken: {
			type: String,
			default: null,
			select: false,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

userSchema.pre("save", async function () {
	if (!this.isModified("password")) return;

	this.password = await hashPassword(this.password);
});

userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
	return comparePassword(password, this.password);
};

export const User = model<IUser>("User", userSchema);
