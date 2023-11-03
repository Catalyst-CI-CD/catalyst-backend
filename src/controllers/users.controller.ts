import * as userService from "./../services/users.service";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../interfaces/user.interface";
import { ExpressHandler } from "../interfaces/ExpressHandler";

export const login: ExpressHandler<LoginRequest, LoginResponse> = async (
  req,
  res
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.error("Some login fields are missing! ", 400);
    return;
  }
  const token = await userService.login({ email, password });
  return res.status(200).json({
    message: "success!",
    data: {
      jwtToken: token,
    },
  });
};

export const register: ExpressHandler<
  RegisterRequest,
  RegisterResponse
> = async (req, res) => {
  const { email, name, username, password } = req.body;
  if (!name || !email || !password || !username) {
    console.error("Some registration fields are missing! ", 400);
    return;
  }
  const newUser = await userService.register({
    name,
    username,
    email,
    password,
  });
  if (newUser) {
    return res.status(201).json({
      message: "success!",
      data: newUser,
    });
  } else {
    return;
  }
};
