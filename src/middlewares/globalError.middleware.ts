import { ResponseMessage } from '../enums/ResponseMessage.enum';
import { ErrorResponse } from '../interfaces/errorResponse.interface';
import { ExpressHandler } from '../interfaces/expressHandler.interface';

export const globalErrorHandler: ExpressHandler<any, ErrorResponse> = (req, res) => {
  res.status(500).json({
    message: ResponseMessage.INTERNAL_SERVER_ERROR,
  });
};
