import { Request, Response } from "express";
import MealPreparation from "../models/mealPreparation";

export const assignFoodPreparationTask = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const mealPreparation = new MealPreparation(req.body);
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

export const getMealStatus = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const mealPreparations = await MealPreparation.find({});

    res.status(200).json({ mealPreparations });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
