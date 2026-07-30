import mongoose from "mongoose";
import { ApiError } from "../errors/api-error.js";

export const validateObjectId = (id: string, field = "ID"): void => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError(400, `Invalid ${field}`);
	}
};
