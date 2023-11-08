import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User } from '../interfaces/user.interface';
import prisma from '../datastore/client';

const user = prisma.user;

export async function getUserByEmail(email: string): Promise<User | null> {
  const existingUser: User | null = await user.findFirst({
    where: {
      email,
    },
  });

  return existingUser;
}

export async function getUserByUserName(username: string): Promise<User | null> {
  const existingUser: User | null = await user.findFirst({
    where: {
      username,
    },
  });

  return existingUser;
}

export async function createUser(
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

export const validatePassword = async (
  userPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await compare(userPassword, hashedPassword);
};

export const getToken = async (userId: string): Promise<string> => {
  return sign(userId, process.env.JWT_SECRET as string);
};
