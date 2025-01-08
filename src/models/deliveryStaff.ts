import mongoose, { InferSchemaType } from "mongoose";

// Info - store information about delivery staff who are responsible for delivering meals to patient rooms.

const deliveryStaff = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contactInfo: {
      phone: { type: String },
      email: { type: String },
    },
  },
  { timestamps: true }
);

export type TDeliveryStaff = Omit<
  InferSchemaType<typeof deliveryStaff>,
  "_id" | "createdAt" | "updatedAt"
> & {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const DeliveryStaff = mongoose.model("DeliveryStaff", deliveryStaff);

export default DeliveryStaff;
