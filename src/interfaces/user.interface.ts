export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  password: string;
  photo?: string;
  createdAt?: Date;
  isActive?: boolean;
}

export type RegisterRequest = Omit<User, 'id' | 'role' | 'createdAt' | 'isActive' | 'photo'>;
export type RegisterResponse = {
  message: string;
  data: Omit<User, 'password' | 'isActive' | 'createdAt' | 'role' | 'isActive'>;
};

export type LoginRequest = Pick<User, 'email' | 'password'>;
export type LoginResponse = {
  message: string;
  data: { jwtToken: string };
};
