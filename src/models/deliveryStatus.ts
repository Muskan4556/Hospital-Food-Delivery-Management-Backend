import mongoose, { InferSchemaType } from "mongoose";

// Info - track the delivery status of meals to patients.

const deliveryStatusSchema = new mongoose.Schema(
  {
    deliveryPersonnelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryPersonnel",
      required: true,
    },
    mealPreparationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MealPreparation",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Delivered"],
      default: "Pending",
    },
    deliveryTime: { type: Date, required: true },
    deliveryNotes: { type: String, default: "Default Note" },
  },
  { timestamps: true }
);

export type TDeliveryStatus = Omit<
  InferSchemaType<typeof deliveryStatusSchema>,
  "_id" | "createdAt" | "updatedAt"
> & {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const DeliveryStatus = mongoose.model("DeliveryStatus", deliveryStatusSchema);

export default DeliveryStatus;
