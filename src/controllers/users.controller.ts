import * as userService from "./../services/users.service";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../interfaces/user.interface";
import { ExpressHandler } from "../interfaces/expressHandler.interface";
import { StatusCode } from "../enums/statusCode.enum";
import { ResponseMessage } from "../enums/ResponseMessage.enum";
import { ErrorResponse } from "../interfaces/errorResponse.interface";

export const login: ExpressHandler<LoginRequest, LoginResponse> = async (
  req,
  res,
  next
) => {
  const { email, password } = req.body as { email: string; password: string };

  const token = await userService.login(email, password);

  res.status(StatusCode.HTTP_200_OK).json({
    message: ResponseMessage.TOKEN_SENT_SUCCESSFULLY,
    data: { jwtToken: token },
  });
};

export const register: ExpressHandler<
  RegisterRequest,
  RegisterResponse | ErrorResponse
> = async (req, res, next) => {
  const { email, name, username, password } = req.body as {
    email: string;
    name: string;
    username: string;
    password: string;
  };

  const newUser = await userService.register(name, username, email, password);

  if (newUser) {
    res.status(StatusCode.HTTP_201_CREATED).json({
      message: ResponseMessage.USER_CREATED_SUCCESSFULLY,
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        username: newUser.username,
      },
    });
  } else {
    res
      .status(StatusCode.HTTP_500_INTERNAL_SERVER_ERROR)
      .json({ message: ResponseMessage.INTERNAL_SERVER_ERROR });
  }
};
