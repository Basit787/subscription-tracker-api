import { Router } from "express";
import authRoutes from "./auth.routes.js";
import subscriptionRoutes from "./subscription.routes.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/health", (_req, res) => {
	res.json({ status: "ok" });
});

router.use("/auth", authRoutes);
router.use("/subscriptions", authMiddleware, subscriptionRoutes);

export default router;
