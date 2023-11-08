import * as userService from "./../services/users.service";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../interfaces/user.interface";
import { ExpressHandler } from "../interfaces/expressHandler.interface";
import { JsonResponse } from "../utils/jsonResponse.util";
import catchAsync from "../utils/catchAsync.util";
import { NextFunction, Request, Response } from "express";

export const login: ExpressHandler<LoginRequest, LoginResponse> = async (
  req,
  res,
  next
) => {
  if(!req.body.email || !req.body.password){
    return 
  }
  const { email, password } = req.body;

  const token = await userService.login(email, password );

  // return new JsonResponse(res, 200)
  //   .setMainContent(true, "Token sent successfully!")
  //   .attachTokenCookie(token!, 24 * 60 * 60 * 1000, {
  //     secure: true,
  //     cookieName: "jwt",
  //   })
  //   .setPayload({
  //     token,
  //   })
  //   .send();

  return res.status(200).json({
    message: "token sent successfully",
    data: { jwtToken: token },
  });

};

export const register: ExpressHandler<RegisterRequest, RegisterResponse> =
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, username, password } = req.body;
    const newUser = await userService.register({
      name,
      username,
      email,
      password,
    });
    if (newUser) {
      return new JsonResponse(res, 201)
        .setMainContent(true, "User registered successfully!")
        .setPayload({})
        .send();
    } else {
      return res.status(500).json({
        message: "Failed!",
        data: {},
      });
    }
  });
