import { Router } from "express";
import authRoutes from "./auth.routes.js";
import subscriptionRoutes from "./subscription.routes.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../swagger/config.js";
 
const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.use("/auth", authRoutes);
router.use("/subscriptions", authMiddleware, subscriptionRoutes);

export default router;
