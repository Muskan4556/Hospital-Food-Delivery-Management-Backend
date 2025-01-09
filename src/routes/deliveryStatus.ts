import express from "express";
import { verifyToken } from "../middlewares/auth";
import { getValidatedUser } from "../controllers/auth";
import { authorize } from "../middlewares/authorize";
import {
  assignMealToDeliveryPersonnel,
  trackMealDelivery,
  updateDeliveryStatus,
} from "../controllers/deliveryStatus";

const router = express.Router();

router.post(
  "/assign",
  verifyToken,
  getValidatedUser,
  authorize("Inner Pantry Staff"),
  assignMealToDeliveryPersonnel
);

router.post(
  "/track",
  verifyToken,
  getValidatedUser,
  authorize("Hospital Manager"),
  trackMealDelivery
);

router.put(
  "/status/:id",
  verifyToken,
  getValidatedUser,
  authorize("Hospital Manager, Delivery Personnel"),
  updateDeliveryStatus
);

export default router;
