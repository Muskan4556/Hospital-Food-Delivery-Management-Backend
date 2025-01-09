import { Request, Response } from "express";
import MealPreparation from "../models/mealPreparation";
import Patient from "../models/patient";
import DeliveryStatus from "../models/deliveryStatus";
import PantryStaff from "../models/pantryStaff";
import DeliveryPersonnel from "../models/deliveryPersonnel";


export const getDashboardOverview = async (req: Request, res:Response) => {
  try {
    const userRole = req.role;
   
    let dashboardData = {};
    
    if (userRole === 'Hospital Manager') {
      // For Hospital Manager: Get all data (patients, meal prep status, deliveries, pantry staff)
      const patients = await Patient.find({});
      const mealPreparations = await MealPreparation.find({});
      const mealDeliveries = await DeliveryStatus.find({});
      const pantryStaff = await PantryStaff.find({});

      dashboardData = {
        patients,
        mealPreparations,
        mealDeliveries,
        pantryStaff
      };
    }
    
    else if (userRole === 'Inner Pantry Staff') {
      // For Inner Pantry Staff: Get assigned meal preparations and delivery tasks
      const mealPreparations = await MealPreparation.find({ status: 'In Progress' });
      const deliveryPersonnel = await DeliveryPersonnel.find({});

      dashboardData = {
        mealPreparations,
        deliveryPersonnel
      };
    }
    
    else if (userRole === 'Delivery Personnel') {
      // For Delivery Personnel: Get assigned deliveries
      const mealDeliveries = await DeliveryStatus.find({ deliveryPersonnelId: req.userId });

      dashboardData = {
        mealDeliveries
      };
    }

    // Send the personalized dashboard data based on the role
    res.status(200).json({
      success: true,
      message: "Dashboard data retrieved successfully",
      data: dashboardData
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later"
    });
  }
};

module.exports = {
  getDashboardOverview
};
