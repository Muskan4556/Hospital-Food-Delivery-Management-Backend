import { Request, Response } from "express";
import DietChart from "../models/dietChart";

export const createDietChart = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { patientId, ...dietData } = req.body;

    const existingDietChart = await DietChart.findOne({ patientId });

    if (existingDietChart) {
      return res
        .status(400)
        .json({ message: "Diet chart already exists for this patient." });
    }

    const dietChart = new DietChart({
      patientId,
      morningMeal: dietData.morningMeal,
      eveningMeal: dietData.eveningMeal,
      nightMeal: dietData.nightMeal,
      ingredients: dietData.ingredients,
      instructions: dietData.instructions,
    });

    await dietChart.save();
    res.status(201).json({
      message: "Diet chart created successfully",
      dietChart,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllDietChart = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const dietChart = await DietChart.find({})
      .populate("patientId", "name gender age diseases allergies")
      .lean();

    if (!dietChart) {
      return res
        .status(404)
        .json({ message: "Diet chart not found for this patient." });
    }

    res.status(200).json(dietChart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateDietChart = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const dietId = req.params.id;

    if (!dietId) {
      return res.status(404).json({ message: "Diet chart not found." });
    }

    const updatedDietChart = await DietChart.findOneAndUpdate(
      { _id: dietId },
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Diet chart updated successfully",
      dietChart: updatedDietChart,
    });
  } catch (err) {
    console.error("Error updating diet chart:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteDietChart = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const dietId = req.params.id;

    if (!dietId) {
      return res.status(400).json({ message: "Patient ID is required." });
    }

    const deletedDietChart = await DietChart.findOneAndDelete({
      _id: dietId,
    });

    if (!deletedDietChart) {
      return res
        .status(404)
        .json({ message: "Diet chart not found for this patient." });
    }

    res.status(200).json({
      message: "Diet chart deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
