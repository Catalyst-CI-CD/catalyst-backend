import { StatusCode } from '../enums/statusCode.enum';
import { ResponseMessage } from '../enums/ResponseMessage.enum';
import { ErrorResponse } from '../interfaces/errorResponse.interface';
import { ExpressHandler } from '../interfaces/expressHandler.interface';

export const globalErrorHandler: ExpressHandler<any, ErrorResponse> = (_req, res) => {
  res.status(StatusCode.HTTP_500_INTERNAL_SERVER_ERROR).json({
    message: ResponseMessage.INTERNAL_SERVER_ERROR,
  });
};
