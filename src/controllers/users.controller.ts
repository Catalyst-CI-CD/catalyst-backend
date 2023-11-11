import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../interfaces/user.interface';
import { ExpressHandler } from '../interfaces/expressHandler.interface';
import { StatusCode } from '../enums/statusCode.enum';
import { ResponseMessage } from '../enums/ResponseMessage.enum';
import { ErrorResponse } from '../interfaces/errorResponse.interface';
import {
  createUser,
  getToken,
  getUserByEmail,
  getUserByUserName,
  validatePassword,
} from '../services/users.service';

export const register: ExpressHandler<RegisterRequest, RegisterResponse | ErrorResponse> = async (
  req,
  res,
  next
) => {
  try {
    const { email, name, username, password } = req.body as {
      email: string;
      name: string;
      username: string;
      password: string;
    };

    if (await getUserByEmail(email)) {
      return res
        .status(StatusCode.HTTP_409_CONFLICT)
        .json({ message: ResponseMessage.DUPLICATE_EMAIL });
    } else if (await getUserByUserName(username)) {
      return res
        .status(StatusCode.HTTP_409_CONFLICT)
        .json({ message: ResponseMessage.DUPLICATE_USERNAME });
    }

    const newUser = await createUser(email, name, username, password);
    return res.status(StatusCode.HTTP_201_CREATED).json({
      message: ResponseMessage.USER_CREATED_SUCCESSFULLY,
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        username: newUser.username,
      },
    });
  } catch (error: any) {
    console.error(error.stack);
    return next();
  }
};

export const login: ExpressHandler<LoginRequest, LoginResponse> = async (req, res, next) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    const user = await getUserByEmail(email);
    if (!user) {
      return res
        .status(StatusCode.HTTP_404_NOT_FOUND)
        .json({ message: ResponseMessage.USER_NOT_FOUND });
    }

    const isPasswordCorrect = await validatePassword(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(StatusCode.HTTP_401_UNAUTHORIZED)
        .json({ message: ResponseMessage.INVALID_PASSWORD });
    }

    const token = getToken(user.id);

    return res.status(StatusCode.HTTP_200_OK).json({
      message: ResponseMessage.SUCCESSFUL_LOGIN,
      data: { jwtToken: token },
    });
  } catch (error: any) {
    console.error(error.stack);
    return next();
  }
};
