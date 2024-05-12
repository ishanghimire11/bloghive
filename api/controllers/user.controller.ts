import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "@/models/user.model";

export const userRoute = (req: Request, res: Response) => {
  res.send("Hello World!");
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  if (req.user.id !== req.params.userId) {
    return next(
      res
        .status(401)
        .json({ message: "Unauthorized if userid and params don't match" })
    );
  }

  let hashedPassword;
  hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          photoUrl: req.body.photoUrl,
          password: hashedPassword,
        },
      },
      { new: true }
    );
    console.log(updatedUser);
    // @ts-ignore
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
};
