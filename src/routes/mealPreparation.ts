import express from "express";
import { verifyToken } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";
import {
  assignDeliveryTask,
  assignFoodPreparationTask,
  deleteMeal,
  getAllMeal,
  updateMealStatus,
} from "../controllers/mealPreparation";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  authorize("Hospital Manager", "Admin"),
  assignFoodPreparationTask
);

router.post(
  "/delivery",
  verifyToken,
  authorize("Hospital Manager", "Inner Pantry Staff", "Admin"),
  assignDeliveryTask
);

router.get(
  "/",
  verifyToken,
  authorize("Hospital Manager", "Inner Pantry Staff", "Admin"),
  getAllMeal
);

router.put(
  "/:id",
  verifyToken,
  authorize("Hospital Manager", "Inner Pantry Staff", "Admin"),
  updateMealStatus
);

router.delete(
  "/:id",
  verifyToken,
  authorize("Hospital Manager", "Admin"),
  deleteMeal
);
export default router;
