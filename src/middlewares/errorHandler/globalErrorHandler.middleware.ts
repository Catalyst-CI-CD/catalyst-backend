import { NextFunction, Request, Response } from "express";
import {
  JsonResponse,
  PayloadFailedDev,
  PayloadFailedProd,
} from "../../utils/JsonResponse";

/**
 * Sends error response in production environment.
 * @function sendErrorProd
 * @param {PayloadFailedProd} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const sendErrorProd = (err: PayloadFailedProd, req: Request, res: Response) => {
  // console.error("ERROR 💥", err);

  if (err.isOperational) {
    return new JsonResponse(res, err.statusCode)
      .setMainContent(false, "Something went wrong!")
      .setError({
        status: err.status,
        message: err.message,
      })
      .send();
  }

  return new JsonResponse(res, 500)
    .setMainContent(false, "Something went wrong!")
    .setError({
      status: "error",
      message: "Something went very wrong!",
    })
    .send();
};

/**
 * Sends error response in development environment.
 * @function sendErrorDev
 * @param {PayloadFailedDev} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const sendErrorDev = (err: PayloadFailedDev, req: Request, res: Response) => {
  console.error("ERROR 💥", err);

  return new JsonResponse(res, err.statusCode)
    .setMainContent(false, "Something went wrong!")
    .setError({
      status: err.status,
      message: err.message,
      devError: {
        error: err.error,
        stack: err.stack,
      },
    })
    .send();
};

/**
 * Global error handler middleware.
 * @function globalErrorHandler
 * @param {Error} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";

  if (process.env.NODE_ENV === "production") {
    const error = { ...err, message: err.message };

    return sendErrorProd(error, req, res);
  }

  return sendErrorDev(err, req, res);
};
