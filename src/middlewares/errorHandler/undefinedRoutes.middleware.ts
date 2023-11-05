import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/AppError";

/**
 * Middleware to handle undefined routes by generating a 404 error.
 * @function
 * @name undefinedRoutesHandler
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
export const undefinedRoutesErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};
