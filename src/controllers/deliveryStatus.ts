import { Request, Response } from "express";
import DeliveryStatus from "../models/deliveryStatus";
import DeliveryPersonnel from "../models/deliveryPersonnel";
import MealPreparation from "../models/mealPreparation";
import Patient from "../models/patient";

export const assignMealToDeliveryPersonnel = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { mealPreparationId, deliveryPersonnelId, patientId, deliveryTime } =
      req.body;

    if (!deliveryTime) {
      return res.status(400).json({ message: "Delivery time is required" });
    }

    const mealPreparation = await MealPreparation.findById(mealPreparationId);
    if (!mealPreparation) {
      return res.status(404).json({ message: "Meal Preparation not found" });
    }

    const deliveryPersonnel = await DeliveryPersonnel.findById(
      deliveryPersonnelId
    );
    if (!deliveryPersonnel) {
      return res.status(404).json({ message: "Delivery Personnel not found" });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const deliveryStatus = new DeliveryStatus({
      mealPreparationId,
      deliveryPersonnelId,
      patientId,
      deliveryStatus: "Pending",
      deliveryTime,
    });
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

export const updateDeliveryStatus = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const deliveryId = req.params.id;
    if (!deliveryId) {
      return res.status(404).json({ message: "Delivery ID not found" });
    }
    const { status } = req.body;

    const updatedDeliveryInfo = await DeliveryStatus.findByIdAndUpdate(
      deliveryId,
      { status: status },
      { new: true }
    );
    if (!updatedDeliveryInfo) {
      return res.status(404).json({ message: "Delivery Info not found" });
    }

    res.status(200).json({
      message: "Status updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllDeliveryInfo = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const delivery = await DeliveryStatus.find({})
      .populate("deliveryPersonnelId")
      .populate("mealPreparationId")
      .populate("patientId")
      .populate({
        path: "mealPreparationId",
        populate: [{ path: "pantryStaffId" }],
      })
      .lean();

    if (!delivery || delivery.length === 0) {
      return res.status(404).json({ message: "No delivery info found" });
    }

    res.status(200).json(delivery);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteDelivery = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const deliveryPersonnel = await DeliveryStatus.findByIdAndDelete(
      req.params.id
    );
    if (!deliveryPersonnel)
      return res.status(404).json({ message: "Delivery not found" });
    return res
      .status(200)
      .json({ message: "Delivery deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};