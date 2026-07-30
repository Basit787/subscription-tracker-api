import type {
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
} from "express";
import { logger } from "../utils/logger.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	logger.error({ err }, "Unhandled error");
	res.status(err.statusCode ?? 500).json({
		error: err.message ?? "Internal server error",
	});
};

export const asyncHandler =
	(fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) =>
	(req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
