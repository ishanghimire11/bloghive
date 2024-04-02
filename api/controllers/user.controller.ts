import { Request, Response } from "express";

export const testRoute = (req: Request, res: Response) => {
  res.send("Hello World!");
};
