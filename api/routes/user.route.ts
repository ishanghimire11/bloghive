import express from "express";
import { updateUser, userRoute } from "@/controllers/user.controller";
import { verifyToken } from "@/utils/verifyUser";

const router = express.Router();

router.get("/user", userRoute);
router.put("/update/:userId", verifyToken, updateUser);

export default router;
