import express from "express";
import { verifyToken } from "../middlewares/auth";

import { authorize } from "../middlewares/authorize";
import {
  createPantryStaff,
  deletePantryStaff,
  getAllPantryStaff,
  updatePantryStaff,
} from "../controllers/pantryStaff";

const router = express.Router();

router.post("/", verifyToken, authorize("Hospital Manager", "Admin"), createPantryStaff);

router.get(
  "/",
  verifyToken,
  authorize("Hospital Manager", "Inner Pantry Staff", "Admin"),
  getAllPantryStaff
);

router.put(
  "/:id",
  verifyToken,
  authorize("Hospital Manager", "Inner Pantry Staff", "Admin"),
  updatePantryStaff
);

router.delete(
  "/:id",
  verifyToken,
  authorize("Hospital Manager", "Admin"),
  deletePantryStaff
);

export default router;
