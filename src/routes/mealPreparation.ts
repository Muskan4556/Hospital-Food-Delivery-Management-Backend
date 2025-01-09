import express from "express";
import { verifyToken } from "../middlewares/auth";
import { getValidatedUser } from "../controllers/auth";
import { authorize } from "../middlewares/authorize";
import {
  assignDeliveryTask,
  assignFoodPreparationTask,
  getMealStatus,
} from "../controllers/mealPreparation";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  getValidatedUser,
  authorize("Hospital Manager"),
  assignFoodPreparationTask
);

router.post(
  "/delivery",
  verifyToken,
  getValidatedUser,
  authorize("Hospital Manager", "Inner Pantry Staff"),
  assignDeliveryTask
);

router.get(
  "/status",
  verifyToken,
  getValidatedUser,
  authorize("Hospital Manager", "Inner Pantry Staff"),
  getMealStatus
);

export default router;
