import express from "express";
import { SignUp, SignIn } from "@/controllers/auth.controller";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);

export default router;
