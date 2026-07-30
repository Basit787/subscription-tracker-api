import { Router } from "express";
import authRoutes from "./authRoutes.js";

const router = Router();

router.get("/health", (_req, res) => {
	res.json({ status: "ok" });
});

router.use("/auth", authRoutes);

export default router;
