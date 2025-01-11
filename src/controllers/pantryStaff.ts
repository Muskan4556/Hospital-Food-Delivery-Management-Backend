import { Request, Response } from "express";
import PantryStaff from "../models/pantryStaff";

export const createPantryStaff = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const pantryStaff = new PantryStaff(req.body);
    await pantryStaff.save();
    return res.status(201).json(pantryStaff);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getAllPantryStaff = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const pantryStaffList = await PantryStaff.find({});
    return res.status(200).json(pantryStaffList);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updatePantryStaff = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const pantryStaff = await PantryStaff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!pantryStaff)
      return res.status(404).json({ message: "Pantry Staff not found" });
    return res.status(200).json(pantryStaff);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deletePantryStaff = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Invalid request" });
    }
    console.log(req.params.id);
    

    const pantryStaff = await PantryStaff.findByIdAndDelete(req.params.id);
    if (!pantryStaff)
      return res.status(404).json({ message: "Pantry Staff not found" });
    return res
      .status(200)
      .json({ message: "Pantry Staff deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
