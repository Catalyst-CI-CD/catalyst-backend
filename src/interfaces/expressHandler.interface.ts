import { RequestHandler } from "express";

export type ExpressHandler<RequestBody, ResposeBody> = RequestHandler<
  any,
  Partial<ResposeBody>,
  Partial<RequestBody>,
  any
>;
