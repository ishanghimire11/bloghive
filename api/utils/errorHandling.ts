import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

const errorHandler: ErrorRequestHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res
    .status(statusCode)
    .json({ statusCode: statusCode, message: message });
};

export const customErrorHandler = (statusCode: number, message: string) => {
  const error = new Error();
  error.message = message;
  //@ts-ignore
  error.statusCode = statusCode;
  return error;
};

export default errorHandler;
