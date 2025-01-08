import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const roleMapping: {
  [key: string]:
    | "Hospital Manager"
    | "Inner Pantry Staff"
    | "Delivery Personnel";
} = {
  "hospital_manager@xyz.com": "Hospital Manager",
  "hospital_pantry@xyz.com": "Inner Pantry Staff",
  "hospital_delivery@xyz.com": "Delivery Personnel",
};

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    user = new User({ name, email, password });

    user.role = roleMapping[email] || "Patient";

    await user.save();

    const token = jwt.sign(
      { userId: user?._id, role: user.role },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1
    });

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({
      message: "Logged in successfully",
      userId: user._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  res.cookie("auth_token", "", { expires: new Date(0) });
  res.status(200).json("Logout successfully");
};

export const getValidatedUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    return res.status(200).send({ userId: req.userId });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
