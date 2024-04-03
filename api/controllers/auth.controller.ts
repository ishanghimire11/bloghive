import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { connectDB } from "..";
import User from "@/models/user.model";

export const signUp = async (req: Request, res: Response) => {
  if (req.method === "POST" && req.body) {
    try {
      connectDB();
      const { username, email, password } = req.body;

      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = new User({ username, email, password: hashedPassword });

      await newUser.save();

      res.json("creation sucessful");
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
};
