import express from "express";
import { verifyToken } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";
import {
  getAllPatients,
  createPatient,
  deletePatient,
  getPatientById,
  updatePatient,
} from "../controllers/patient";
import { validatePatient } from "../middlewares/validator";

const router = express.Router();

router.post(
  "/",
  validatePatient,
  verifyToken,
  authorize("Hospital Manager", "Admin"),
  createPatient
);
router.get(
  "/",
  verifyToken,
  authorize("Hospital Manager", "Admin"),
  getAllPatients
);
router.get(
  "/:id",
  verifyToken,
  authorize("Hospital Manager", "Admin"),
  getPatientById
);
router.put(
  "/:id",
  verifyToken,
  authorize("Hospital Manager", "Admin"),
  updatePatient
);
router.delete(
  "/:id",
  verifyToken,
  authorize("Hospital Manager", "Admin"),
  deletePatient
);

export default router;
