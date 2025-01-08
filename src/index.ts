import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth";

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
