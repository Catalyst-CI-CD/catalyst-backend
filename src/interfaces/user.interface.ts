export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  photo: string;
  role: string;
  createdAt?: Date;
  isActive?: boolean;
  password?: string;
}

export interface ErrorResponse {
  message: string;
}

export type LoginRequest = User;
export type LoginResponse = LoginResponseSuccess | Error;
export type LoginResponseSuccess = {
  message: string;
  data: { jwtToken: string };
};

export type RegisterRequest = User;
export type RegisterResponse = RegisterResponseSuccess | Error;
export type RegisterResponseSuccess = {
  message: string;
  data: Omit<User, "password" | "isActive" | "createdAt">;
};
