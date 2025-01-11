import express from "express";
import { verifyToken } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";
import {
  assignMealToDeliveryPersonnel,
  deleteDelivery,
  getAllDeliveryInfo,
  updateDeliveryStatus,
} from "../controllers/deliveryStatus";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  authorize("Inner Pantry Staff", "Admin"),
  assignMealToDeliveryPersonnel
);

router.get(
  "/",
  verifyToken,
  authorize("Hospital Manager", "Admin"),
  getAllDeliveryInfo
);

router.put(
  "/:id",
  verifyToken,
  authorize("Hospital Manager, Delivery Personnel", "Admin"),
  updateDeliveryStatus
);

router.delete(
  "/:id",
  verifyToken,
  authorize("Hospital Manager", "Admin"),
  deleteDelivery
);

export default router;
