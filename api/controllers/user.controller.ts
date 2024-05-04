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
  console.log(req.user.id, "req.user.id");
  console.log(req.params.userId, "req.params.userId");
  if (req.user.id !== req.params.userId) {
    return next(
      res
        .status(401)
        .json({ message: "Unauthorized if userid and params don't match" })
    );
  }

  let hashedPassword;

  if (req.body.email) {
    if (req.body.password) {
      hashedPassword = await bcrypt.hash(req.body.password, 10);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            photoUrl: req.body.imageUrl,
            password: hashedPassword,
          },
        },
        { new: true }
      );
      // @ts-ignore
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (err) {
      return res.json(err);
    }
  }

  return res.json(req.user);
};
