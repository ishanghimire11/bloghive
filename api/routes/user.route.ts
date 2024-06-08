import express from "express";
import {
  updateUser,
  userRoute,
  deleteUser,
  signOut,
} from "@/controllers/user.controller";
import { verifyToken } from "@/utils/verifyUser";

const router = express.Router();

router.get("/user", userRoute);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signOut)

export default router;
