import { NextFunction, Request, Response } from "express";

/**
 * A middleware that catches any errors thrown by an async function and passes them to the next middleware.
 *  Wrap any controller with function to catch any errors.
 *
 * @param {Function} fn The async function to wrap.
 * @returns {Function} A middleware function that catches errors.
 */
export = function catchAsync(fn: Function) {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch(next);
  };
};
