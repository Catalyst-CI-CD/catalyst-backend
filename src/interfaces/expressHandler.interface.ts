import { RequestHandler } from 'express';

export type ExpressHandler<RequestBody, ResponseBody> = RequestHandler<
  any,
  Partial<ResponseBody>,
  Partial<RequestBody>,
  any
>;
