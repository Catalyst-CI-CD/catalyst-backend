import { validationResult } from 'express-validator';
import { StatusCode } from '../enums/statusCode.enum';
import { ExpressHandler } from '../interfaces/expressHandler.interface';
import { ErrorResponse } from '../interfaces/errorResponse.interface';

export const handleValidation: ExpressHandler<any, ErrorResponse> = (
  req,
  res,
  next
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const allErrors = errors.array();
    res
      .status(StatusCode.HTTP_400_BAD_REQUEST)
      .json({ message: allErrors[0].msg });
    return;
  }
  next();
};
