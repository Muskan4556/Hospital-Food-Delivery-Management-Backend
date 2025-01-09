import express from "express";
import { verifyToken } from "../middlewares/auth";
import { getValidatedUser } from "../controllers/auth";
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
  getValidatedUser,
  authorize("Inner Pantry Staff"),
  createDeliveryPersonnel
);

router.get(
  "/",
  verifyToken,
  getValidatedUser,
  authorize("Inner Pantry Staff"),
  getAllDeliveryPersonnel
);

router.put(
  "/:id",
  verifyToken,
  getValidatedUser,
  authorize("Inner Pantry Staff"),
  updateDeliveryPersonnel
);

router.delete(
  "/:id",
  verifyToken,
  getValidatedUser,
  authorize("Inner Pantry Staff"),
  deleteDeliveryPersonnel
);

export default router;
