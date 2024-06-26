import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "@/routes/user.route";
import authRoutes from "@/auth/auth.route";
import errorHandler from "@/utils/errorHandling";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

const PORT = process.env.PORT;

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);
