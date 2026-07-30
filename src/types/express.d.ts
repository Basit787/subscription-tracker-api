import "express";
import { IUser } from "../models/User.js";

declare global {
	namespace Express {
		interface Request {
			userId?: string;
			user?: IUser;
		}
	}
}
