import express from "express";
import { verifyToken } from "../middlewares/auth";
import { getValidatedUser } from "../controllers/auth";
import { authorize } from "../middlewares/authorize";
import {
  getAllPatients,
  createPatient,
  deletePatient,
  getPatientById,
  updatePatient,
} from "../controllers/patient";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  getValidatedUser,
  authorize("Hospital Manager"),
  createPatient
);
router.get(
  "/",
  verifyToken,
  getValidatedUser,
  authorize("Hospital Manager"),
  getAllPatients
);
router.get(
  "/:id",
  verifyToken,
  getValidatedUser,
  authorize("Hospital Manager"),
  getPatientById
);
router.put(
  "/:id",
  verifyToken,
  getValidatedUser,
  authorize("Hospital Manager"),
  updatePatient
);
router.delete(
  "/:id",
  verifyToken,
  getValidatedUser,
  authorize("Hospital Manager"),
  deletePatient
);

export default router;
