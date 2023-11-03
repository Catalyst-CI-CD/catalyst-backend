import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { User } from "../interfaces/user.interface";

// TODO: Implement Error Handler
// TODO: Implement DB Object

const user = new PrismaClient().user;

export const register = async ({ name, username, email, password }: User) => {
  // Validate register fields
  if (!name || !email || !password || !username) {
    console.error("Some registration fields are missing! ", 400);
    return;
  }

  // Validate that email is not already registered
  const existingUser: User | null = await user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) {
    console.error("This user is already registered! ", 400);
    return;
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
    console.error("Error in registering the user! ", 500, err);
  }
};

export const login = async ({ email, password }: User): Promise<string> => {
  const existingUser = await user.findFirst({
    where: {
      email,
    },
  });

  if (!existingUser) {
    console.error(
      "This email is not attached to any account. Please try again! ",
      400
    );
    return Promise.resolve(
      "This email is not attached to any account. Please try again! "
    );
  }

  //compare the saved password with the password send via request body
  const isPassTrue = await compare(password!, existingUser.password);

  if (!isPassTrue) {
    console.error("Invalid password try again! ", 400);
    return Promise.resolve("Invalid password try again!");
  }

  const { id } = existingUser;

  const jwt = sign(id, process.env.JWT_SECRET as string);

  return Promise.resolve(jwt);
};
