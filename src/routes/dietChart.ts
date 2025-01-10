import express from "express";
import { verifyToken } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";
import {
  createDietChart,
  deleteDietChart,
  getAllDietChart,
  updateDietChart,
} from "../controllers/dietChart";

const router = express.Router();

router.post("/", verifyToken, authorize("Hospital Manager"), createDietChart);
router.get(
  "/",
  verifyToken,
  authorize("Hospital Manager", "Inner Pantry Staff"),
  getAllDietChart
);
router.put("/:id", verifyToken, authorize("Hospital Manager"), updateDietChart);

router.delete(
  "/:id",
  verifyToken,
  authorize("Hospital Manager"),
  deleteDietChart
);

export default router;
