import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { User } from "../interfaces/user.interface";
import prisma from "../datastore/client";
import { AppError } from "../utils/appError.util";
import { StatusCode } from "../enums/statusCode.enum";
import { ResponseMessage } from "../enums/ResponseMessage.enum";

const user = prisma.user;

export const register = async (
  name: string,
  email: string,
  password: string,
  username: string
): Promise<User | null> => {
  try {
    checkExistingEmail(email);
    checkExistingUserName(username);
    const newUser = await createUser(email, name, username, password);
    return newUser;
  } catch (err) {
    throw new AppError(
      ResponseMessage.INTERNAL_SERVER_ERROR,
      StatusCode.HTTP_500_INTERNAL_SERVER_ERROR
    );
  }
};

async function checkExistingEmail(email: string) {
  const existingUser: User | null = await user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new AppError(
      ResponseMessage.DUPLICATE_EMAIL,
      StatusCode.HTTP_400_BAD_REQUEST
    );
  }
}

async function checkExistingUserName(username: string) {
  const existingUser: User | null = await user.findFirst({
    where: {
      username,
    },
  });

  if (existingUser) {
    throw new AppError(
      ResponseMessage.DUPLICATE_USERNAME,
      StatusCode.HTTP_400_BAD_REQUEST
    );
  }
}

async function createUser(
  email: string,
  name: string,
  username: string,
  password: string
): Promise<User> {
  const hashedPassword = await hash(password, 12);

  const newUser: User = await user.create({
    data: {
      email,
      name,
      username,
      password: hashedPassword,
    },
  });

  return newUser;
}

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  const user = await getUser(email);

  const isPassTrue = await compare(password, user.password!);
  if (!isPassTrue) {
    throw new AppError(
      ResponseMessage.INVALID_PASSWORD,
      StatusCode.HTTP_400_BAD_REQUEST
    );
  }

  const jwt = sign(user.id, process.env.JWT_SECRET as string);
  if (!jwt) {
    throw new AppError(ResponseMessage.INTERNAL_SERVER_ERROR, 500);
  }
  return jwt;
};

async function getUser(email: string): Promise<User> {
  const loggedUser: User | null = await user.findFirst({
    where: {
      email,
    },
  });

  if (!loggedUser) {
    throw new AppError(
      ResponseMessage.USER_NOT_FOUND,
      StatusCode.HTTP_400_BAD_REQUEST
    );
  }
  return loggedUser;
}
