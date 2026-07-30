import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export const validate =
	(schema: ZodType, property: "body" | "params" | "query" = "body") =>
	(req: Request, _res: Response, next: NextFunction) => {
		const result = schema.safeParse(req[property]);

		if (!result.success) {
			return next(result.error);
		}

		req[property] = result.data;
		next();
	};
