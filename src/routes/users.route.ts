import { Router } from 'express';

import { login, register } from '../controllers/users.controller';
import { validateLogIn, validateRegister } from '../validators/users.validator';

export const userRouter = Router();

// Public Routes
userRouter.post('/register', validateRegister, register);
userRouter.post('/login', validateLogIn, login);

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     tags:
 *       - users
 *     summary: Register new user account
 *     description: Create a new account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       '400':
 *         description: Invalid input or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '409':
 *         description: Username or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * /api/v1/users/login:
 *   post:
 *     tags:
 *       - users
 *     summary: Login for an account
 *     description: Log in a new session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       '400':
 *         description: Invalid input or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '404':
 *         description: User not exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '401':
 *         description: Invalid password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse' 
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */