import express from "express";
import { userRoute } from "@/controllers/user.controller";

const router = express.Router();

router.get("/user", userRoute);

export default router;
