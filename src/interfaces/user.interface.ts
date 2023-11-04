export interface User {
  id?: string;
  name?: string;
  username?: string;
  password?: string;
  email?: string;
  photo?: string;
  role?: string;
  isActive?: boolean;
  createdAt?: Date;
}

export interface Error{
  message:string;
}

export type LoginRequest = User;
export type LoginResponse = {
  message: string;
  data: { jwtToken: string };
}|Error;

export type RegisterRequest = User;
export type RegisterResponse = {
  message: string;
  data: Omit<User, "password" | "isActive" | "createdAt">;
}|Error;
