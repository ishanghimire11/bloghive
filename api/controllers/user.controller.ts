import { Request, Response } from "express";

export const userRoute = (req: Request, res: Response) => {
  res.send("Hello World!");
};
