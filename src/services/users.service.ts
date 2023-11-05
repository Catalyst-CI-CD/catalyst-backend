import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { User } from "../interfaces/user.interface";
import prisma from "../datastore/client";
import { AppError } from "../utils/AppError";

const user = prisma.user;

export const register = async ({
  name,
  username,
  email,
  password,
}: User): Promise<User | null> => {
  // Validate register fields
  if (!name || !email || !password || !username) {
    throw new AppError("Some registration fields are missing!", 400);
  }

  // Validate that email is not already registered
  const existingUser: User | null = await user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new AppError("This user is already registered", 400);
  }

  try {
    // Password hashing
    const hashedPassword = await hash(password, 12);

    // Create new user
    const newUser: User | null = await user.create({
      data: {
        email,
        name,
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        photo: true,
        role: true,
      },
    });

    return newUser;
  } catch (err) {
    throw new AppError("Error in registering the user!", 500);
  }
};

export const login = async ({ email, password }: User): Promise<string> => {
  const existingUser = await user.findFirst({
    where: {
      email,
    },
  });

  if (!existingUser) {
    throw new AppError(
      "This email is not attached to any account. Please try again!",
      400
    );
  }

  //compare the saved password with the password send via request body
  const isPassTrue = await compare(password!, existingUser.password);

  if (!isPassTrue) {
    throw new AppError("Invalid password try again!", 400);
  }

  const { id } = existingUser;
  const jwt = sign(id, process.env.JWT_SECRET as string);

  if (!jwt) {
    throw new AppError("Something wrong happened in generating the token", 500);
  }

  return jwt;
};
