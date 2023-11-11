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
  data: Omit<User, 'password' | 'createdAt' | 'role' | 'isActive'>;
};

export type LoginRequest = Pick<User, 'email' | 'password'>;
export type LoginResponse = {
  message: string;
  data: { jwtToken: string };
};

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the user.
 *           example: "123"
 *         name:
 *           type: string
 *           description: The name of the user.
 *           example: "John Doe"
 *         username:
 *           type: string
 *           description: The username of the user.
 *           example: "johndoe"
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *           example: "john.doe@example.com"
 *         role:
 *           type: string
 *           description: The role of the user.
 *           example: MEMBER
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the user.
 *           example: "secretpassword"
 *         photo:
 *           type: string
 *           description: The URL or path to the user's photo (optional).
 *           example: "https://example.com/user.jpg"
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was created (optional).
 *           example: "2023-11-10T12:00:00Z"
 *           nullable: true
 *         isActive:
 *           type: boolean
 *           description: Indicates whether the user is active or not (optional).
 *           example: true
 *           nullable: true
 * 
 *     RegisterRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user for registration.
 *           example: "John Doe"
 *         username:
 *           type: string
 *           description: The username of the user for registration.
 *           example: "johndoe"
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user for registration.
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the user for registration.
 *           example: "secretpassword"
 *       required:
 *         - name
 *         - username
 *         - email
 *         - password
 *
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A message indicating the result of the registration.
 *           example: "registration successful"
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The unique identifier for the user.
 *               example: "123"
 *             name:
 *               type: string
 *               description: The name of the user.
 *               example: "John Doe"
 *             username:
 *               type: string
 *               description: The username of the user.
 *               example: "johndoe"
 *             email:
 *               type: string
 *               format: email
 *               description: The email address of the user.
 *               example: "john.doe@example.com"
 *             photo:
 *               type: string
 *               description: The URL or path to the user's photo (optional).
 *               example: "https://example.com/user.jpg"
 *               nullable: true
 *
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user for login.
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the user for login.
 *           example: "secretpassword"
 *       required:
 *         - email
 *         - password
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A message indicating the result of the login.
 *           example: "login successful"
 *         data:
 *           type: object
 *           properties:
 *             jwtToken:
 *               type: string
 *               description: The JWT token for authentication.
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */