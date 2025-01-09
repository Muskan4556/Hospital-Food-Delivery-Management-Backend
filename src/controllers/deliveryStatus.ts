import { Request, Response } from "express";
import DeliveryStatus from "../models/deliveryStatus";
import DeliveryPersonnel from "../models/deliveryPersonnel";
import MealPreparation from "../models/mealPreparation";

export const assignMealToDeliveryPersonnel = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { mealPreparationId, deliveryPersonnelId } = req.body;

    // Check if the meal preparation exists
    const mealPreparation = await MealPreparation.findById(mealPreparationId);
    if (!mealPreparation) {
      return res.status(404).json({ message: "Meal Preparation not found" });
    }

    // Check if the delivery personnel exists
    const deliveryPersonnel = await DeliveryPersonnel.findById(
      deliveryPersonnelId
    );
    if (!deliveryPersonnel) {
      return res.status(404).json({ message: "Delivery Personnel not found" });
    }

    // Create a new DeliveryStatus entry
    const deliveryStatus = new DeliveryStatus({
      mealPreparationId,
      deliveryPersonnelId,
      deliveryStatus: "Pending",
    });

    // Save DeliveryStatus
    await deliveryStatus.save();

    res.status(201).json({
      message: "Meal assigned to delivery personnel successfully",
      deliveryStatus,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error assigning meal to delivery personnel" });
  }
};

export const trackMealDelivery = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { mealPreparationId } = req.body;

    // Find the delivery status for the given meal preparation
    const deliveryStatus = await DeliveryStatus.findOne({
      mealPreparationId,
    }).populate("deliveryPersonnelId mealPreparationId");
    if (!deliveryStatus) {
      return res
        .status(404)
        .json({ message: "Delivery Status not found for this meal" });
    }

    return res.status(200).json({
      message: "Meal delivery status retrieved successfully",
      deliveryStatus,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateDeliveryStatus = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      mealPreparationId,
      deliveryPersonnelId,
      status,
      deliveryTime,
      deliveryNotes,
    } = req.body;

    // Find the delivery status for the given meal preparation and delivery personnel
    const deliveryStatus = await DeliveryStatus.findOne({
      mealPreparationId,
      deliveryPersonnelId,
    });
    if (!deliveryStatus) {
      return res.status(404).json({ message: "Delivery Status not found" });
    }

    // Update the delivery status
    deliveryStatus.deliveryStatus = status || deliveryStatus.deliveryStatus;
    deliveryStatus.deliveryTime = deliveryTime || deliveryStatus.deliveryTime;
    deliveryStatus.deliveryNotes =
      deliveryNotes || deliveryStatus.deliveryNotes;

    await deliveryStatus.save();

    res
      .status(200)
      .json({
        message: "Meal delivery status updated successfully",
        deliveryStatus,
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
