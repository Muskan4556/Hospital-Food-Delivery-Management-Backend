import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth";
import patientRoute from "./routes/patient";
import dietChartRoute from "./routes/dietChart";
import mealPreparationRoute from "./routes/mealPreparation";
import mealDeliveryStatusRoute from "./routes/deliveryStatus";
import pantryStaffRoute from "./routes/pantryStaff";
import deliveryPersonnelRoute from "./routes/deliveryPersonnel";

const app = express();

mongoose
  .connect(process.env.MONGODB_CONNECTIONS_STRING as string)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log(`Server is running at PORT_NO: 3000: http://localhost:3000/`);
    });
  })
  .catch((err) => console.log("MongoDB error: ", err));

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// routes
app.get("/health", (req: Request, res: Response) => {
  res.json({
    health: "ok",
  });
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/patient", patientRoute);
app.use("/api/v1//diet-charts", dietChartRoute);
app.use("/api/v1/meal-preparation", mealPreparationRoute);
app.use("/api/v1/meal-delivery-status", mealDeliveryStatusRoute);
app.use("/api/v1/pantry-staff", pantryStaffRoute);
app.use("/api/v1/delivery-personnel", deliveryPersonnelRoute);
