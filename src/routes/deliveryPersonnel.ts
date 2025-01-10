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
  "/delivery-personnel",
  verifyToken,
  authorize("Inner Pantry Staff"),
  createDeliveryPersonnel
);

router.get(
  "/",
  verifyToken,
  authorize("Inner Pantry Staff"),
  getAllDeliveryPersonnel
);

router.put(
  "/:id",
  verifyToken,
  authorize("Inner Pantry Staff"),
  updateDeliveryPersonnel
);

router.delete(
  "/:id",
  verifyToken,
  authorize("Inner Pantry Staff"),
  deleteDeliveryPersonnel
);

export default router;
