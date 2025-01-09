import express from "express";
import { verifyToken } from "../middlewares/auth";
import { getValidatedUser } from "../controllers/auth";
import { authorize } from "../middlewares/authorize";
import {
  createPantryStaff,
  deletePantryStaff,
  getAllPantryStaff,
  updatePantryStaff,
} from "../controllers/pantryStaff";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  getValidatedUser,
  authorize("Hospital Manager"),
  createPantryStaff
);

router.put(
  "/:id",
  verifyToken,
  getValidatedUser,
  authorize("Hospital Manager" ,"Inner Pantry Staff"),
  updatePantryStaff
);

router.delete(
  "/pantry-staff/:id",
  verifyToken,
  getValidatedUser,
  authorize("Hospital Manager"),
  deletePantryStaff
);

export default router;
