import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";

import User from "@/models/user.model";
import { createUserSchema } from "@/validaton/validation";
import { Document } from "mongoose";

export const SignUp = async (
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

      const hashedPassword = await bcrypt.hash(password, 10);

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

export const SignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(404).json({ message: "Incorrect email or password" });
    }

    // @ts-ignore
    const { password: foundUserPassword, ...rest } = foundUser._doc;

    const passwordMatches: boolean = await bcrypt.compare(
      password,
      foundUserPassword
    );

    if (!passwordMatches) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const accessToken = jwt.sign(
      {
        id: rest._id,
      },
      `${process.env.JWT_SECRET_KEY}`
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
      })
      .json(rest);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const Google = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, googlePhotoURL, email } = req.body;

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      // @ts-ignore
      const { password: foundUserPassword, ...rest } = foundUser._doc;
      const accessToken = jwt.sign(
        {
          id: rest._id,
        },
        `${process.env.JWT_SECRET_KEY}`
      );

      return res
        .status(200)
        .cookie("accessToken", accessToken, {
          httpOnly: true,
        })
        .json(rest);
    }
    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);
    const newUser = new User({
      username:
        username.toLowerCase().split(" ").join() +
        Math.random().toString(9).slice(-5),
      email,
      password: hashedPassword,
      photoUrl: googlePhotoURL,
    });

    await newUser.save();

    return res.json("User created successfully");
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
