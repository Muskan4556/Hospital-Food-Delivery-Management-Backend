import mongoose, { InferSchemaType } from "mongoose";

// Info - store patient details, including medical and personal information.

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    diseases: { type: [String], default: [] },
    allergies: { type: [String], default: [] },
    roomNumber: { type: String, required: true },
    bedNumber: { type: String, required: true },
    floorNumber: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    contactInfo: {
      phone: { type: String, required: true },
      email: { type: String },
    },
    emergencyContact: [
      {
        name: { type: String },
        phone: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export type TPatient = Omit<
  InferSchemaType<typeof patientSchema>,
  "_id" | "createdAt" | "updatedAt"
> & {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
