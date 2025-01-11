import mongoose, { InferSchemaType } from "mongoose";

// Info - store information about delivery staff who are responsible for delivering meals to patient rooms.

const deliveryPersonnelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contactInfo: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export type TDeliveryPersonnel = Omit<
  InferSchemaType<typeof deliveryPersonnelSchema>,
  "_id" | "createdAt" | "updatedAt"
> & {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const DeliveryPersonnel = mongoose.model(
  "DeliveryPersonnel",
  deliveryPersonnelSchema
);

export default DeliveryPersonnel;
