import { Router } from "express";
import {
	createSubscription,
	getSubscriptionById,
	getSubscriptions,
	updateSubscriptionStatus,
} from "../controllers/subscription.controller.js";
import { validate } from "../middleware/validate.js";
import {
	createSubscriptionSchema,
	idParamSchema,
	updateSubscriptionSchema,
} from "../validators/subscriptionSchema.js";

const router = Router();

router.post("/", validate(createSubscriptionSchema), createSubscription);
router.get("/", getSubscriptions);
router.get("/:id", validate(idParamSchema, "params"), getSubscriptionById);
router.patch(
	"/:id",
	validate(idParamSchema, "params"),
	validate(updateSubscriptionSchema),
	updateSubscriptionStatus,
);

export default router;
