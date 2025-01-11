import express from "express";
import { verifyToken } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";
import {
  createDeliveryPersonnel,
  getAllDeliveryPersonnel,
  updateDeliveryPersonnel,
  deleteDeliveryPersonnel,
} from "../controllers/deliveryPersonnel";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  authorize("Inner Pantry Staff", "Admin"),
  createDeliveryPersonnel
);

router.get(
  "/",
  verifyToken,
  authorize("Inner Pantry Staff", "Admin"),
  getAllDeliveryPersonnel
);

router.put(
  "/:id",
  verifyToken,
  authorize("Inner Pantry Staff", "Admin"),
  updateDeliveryPersonnel
);

router.delete(
  "/:id",
  verifyToken,
  authorize("Inner Pantry Staff", "Admin"),
  deleteDeliveryPersonnel
);

export default router;
