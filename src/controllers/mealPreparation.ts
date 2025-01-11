import { Request, Response } from "express";
import MealPreparation from "../models/mealPreparation";
import mongoose from "mongoose";

export const assignFoodPreparationTask = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { pantryStaffId, dietChartId, patientId, status } = req.body;

    const convertedPantryStaffId = new mongoose.Types.ObjectId(pantryStaffId);
    const convertedDietChartId = new mongoose.Types.ObjectId(dietChartId);
    const convertedPatientId = new mongoose.Types.ObjectId(patientId);

    const mealPreparation = new MealPreparation({
      pantryStaffId: convertedPantryStaffId,
      dietChartId: convertedDietChartId,
      patientId: convertedPatientId,
      status: status || "Pending",
    });
    await mealPreparation.save();
    res.status(201).json(mealPreparation);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const assignDeliveryTask = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { deliveryPersonnelId, mealPreparationId } = req.body;
    const mealPreparation = await MealPreparation.findByIdAndUpdate(
      mealPreparationId,
      { deliveryPersonnelId, status: "Out for Delivery" },
      { new: true }
    );
    if (!mealPreparation)
      return res.status(404).json({ message: "Meal Preparation not found" });
    res.status(200).json(mealPreparation);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllMeal = async (req: Request, res: Response): Promise<any> => {
  try {
    const mealPreparations = await MealPreparation.find({})
      .populate(["patientId", "dietChartId", "pantryStaffId"])
      .lean();

    if (!mealPreparations || mealPreparations.length === 0) {
      return res.status(404).json({ message: "No Meal Preparations found" });
    }

    res.status(200).json(mealPreparations);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateMealStatus = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const mealId = req.params.id;
    if (!mealId) {
      return res.status(400).json({ message: "Invalid Meal ID" });
    }

    const { status } = req.body;
    const updateMeal = await MealPreparation.findByIdAndUpdate(
      mealId,
      { status: status },
      { new: true }
    );

    if (!updateMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    return res.status(200).json({
      message: "Meal status updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteMeal = async (req: Request, res: Response): Promise<any> => {
  try {
    const mealId = req.params.id;

    if (!mealId) {
      return res.status(400).json({ message: "Meal ID is required." });
    }

    const deletedMeal = await MealPreparation.findOneAndDelete({
      _id: mealId,
    });

    if (!deletedMeal) {
      return res.status(404).json({ message: "Meal not found." });
    }

    res.status(200).json({
      message: "Meal deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
