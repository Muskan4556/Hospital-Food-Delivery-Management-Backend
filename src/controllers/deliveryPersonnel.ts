import { Request, Response } from "express";
import DeliveryPersonnel from "../models/deliveryPersonnel";

export const createDeliveryPersonnel = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const deliveryPersonnel = new DeliveryPersonnel(req.body);
    await deliveryPersonnel.save();
    return res.status(201).json(deliveryPersonnel);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getAllDeliveryPersonnel = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const deliveryPersonnelList = await DeliveryPersonnel.find({});
    return res.status(200).json(deliveryPersonnelList);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateDeliveryPersonnel = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const deliveryPersonnel = await DeliveryPersonnel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!deliveryPersonnel)
      return res.status(404).json({ message: "Delivery Personnel not found" });
    return res.status(200).json(deliveryPersonnel);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteDeliveryPersonnel = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const deliveryPersonnel = await DeliveryPersonnel.findByIdAndDelete(
      req.params.id
    );
    if (!deliveryPersonnel)
      return res.status(404).json({ message: "Delivery Personnel not found" });
    return res
      .status(200)
      .json({ message: "Delivery Personnel deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
