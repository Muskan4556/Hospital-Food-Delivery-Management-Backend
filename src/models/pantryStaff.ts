import mongoose, { InferSchemaType } from "mongoose";

// Info - store information about pantry staff who are responsible for food preparation

const pantryStaffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contactInfo: {
      phone: { type: String, requied: true },
      email: { type: String },
    },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

export type TPantryStaff = Omit<
  InferSchemaType<typeof pantryStaffSchema>,
  "_id" | "createdAt" | "updatedAt"
> & {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const PantryStaff = mongoose.model("PantryStaff", pantryStaffSchema);

export default PantryStaff;
