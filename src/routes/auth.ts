import express from "express";
import { login, logout, signup, getValidatedUser } from "../controllers/auth";
import { verifyToken } from "../middlewares/auth";
import { validateLogin, validateSignup } from "../middlewares/validator";

const router = express.Router();

router.post("/login", validateLogin, login);
router.post("/signup", validateSignup, signup);
router.post("/logout", logout);
router.get("/validate-token", verifyToken, getValidatedUser);

export default router;
