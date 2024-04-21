import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY!, (err: any, user: any) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  });
};
