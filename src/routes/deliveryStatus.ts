import express from "express";
import { verifyToken } from "../middlewares/auth";
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
  authorize("Inner Pantry Staff"),
  assignMealToDeliveryPersonnel
);

router.post(
  "/track",
  verifyToken,
  authorize("Hospital Manager"),
  trackMealDelivery
);

router.put(
  "/status/:id",
  verifyToken,
  authorize("Hospital Manager, Delivery Personnel"),
  updateDeliveryStatus
);

export default router;
