import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "@/routes/user.route";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
});

app.use("/api/users", userRoutes);
