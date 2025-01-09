import express from "express";
import { verifyToken } from "../middlewares/auth";
import { getValidatedUser } from "../controllers/auth";
import { authorize } from "../middlewares/authorize";
import { getDashboardOverview } from "../controllers/dashboard";

const router = express.Router();

router.get(
  "/overview",
  verifyToken,
  getValidatedUser,
  authorize("Hospital Manager", "Inner Pantry Staff", "Delivery Personnel"),
  getDashboardOverview
);

export default router;
