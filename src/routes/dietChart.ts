import express from "express";
import { verifyToken } from "../middlewares/auth";
import { getValidatedUser } from "../controllers/auth";
import { authorize } from "../middlewares/authorize";
import {
  createDietChart,
  deleteDietChart,
  getDietChartByPatientId,
  updateDietChart,
} from "../controllers/dietChart";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  getValidatedUser,
  authorize("Hospital Manager"),
  createDietChart
);
router.get(
  "/:id",
  verifyToken,
  getValidatedUser,
  authorize("Hospital Manager", "Inner Pantry Staff"),
  getDietChartByPatientId
);
router.put(
  "/:id",
  verifyToken,
  getValidatedUser,
  authorize("Hospital Manager"),
  updateDietChart
);

router.delete(
  "/:id",
  verifyToken,
  getValidatedUser,
  authorize("Hospital Manager"),
  deleteDietChart
);


export default router;
