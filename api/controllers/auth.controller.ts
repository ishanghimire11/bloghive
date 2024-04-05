import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { ZodError } from "zod";

import User from "@/models/user.model";
import { createUserSchema } from "@/validaton/validation";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "POST") {
    try {
      const validatedData = createUserSchema.parse(req.body);

      const { username, email, password } = validatedData;

      const existingUsername = await User.findOne({ username: username });
      if (existingUsername) {
        return res.status(400).json({
          message: "Username already exists",
        });
      }

      const existingEmail = await User.findOne({ email: email });
      if (existingEmail) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = new User({ username, email, password: hashedPassword });

      await newUser.save();

      return res.json("User created successfully");
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: `Error in ${err.errors[0].path}. ${err.errors[0].message}`,
        });
      }
      next(err);
    }
  }
};
