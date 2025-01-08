import mongoose, { InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [
        "Patient",
        "Hospital Manager",
        "Inner Pantry Staff",
        "Delivery Personnel",
      ],
      default: "Patient",
    },
  },
  { timestamps: true }
);
export type TUser = Omit<
  InferSchemaType<typeof userSchema>,
  "_id" | "createdAt" | "updatedAt"
> & {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const User = mongoose.model("User", userSchema);

export default User;
