import mongoose, { InferSchemaType } from "mongoose";

// Info - will track the status of meal preparation by pantry staff.

const mealPreparationSchema = new mongoose.Schema(
  {
    pantryStaffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PantryStaff",
      required: true,
    },
    dietChartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DietChart",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export type TMealPreparation = Omit<
  InferSchemaType<typeof mealPreparationSchema>,
  "_id" | "createdAt" | "updatedAt"
> & {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const MealPreparation = mongoose.model("MealPreparation", mealPreparationSchema);

export default MealPreparation;
