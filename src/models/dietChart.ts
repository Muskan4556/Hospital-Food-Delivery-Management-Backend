import mongoose, { InferSchemaType } from "mongoose";

// Info - store meal plans for the patient, including specific instructions

const dietChartSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    morningMeal: { type: String },
    eveningMeal: { type: String },
    nightMeal: { type: String },
    ingredients: [
      {
        ingredient: { type: String, required: true },
        quantity: { type: String, required: true },
      },
    ],
    instructions: [{ type: String }],
  },
  { timestamps: true }
);

export type TDietChart = Omit<
  InferSchemaType<typeof dietChartSchema>,
  "_id" | "createdAt" | "updatedAt"
> & {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const DietChart = mongoose.model("DietChart", dietChartSchema);

export default DietChart;
