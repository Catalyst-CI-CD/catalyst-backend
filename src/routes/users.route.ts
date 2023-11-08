import { Router } from "express";

import { login, register } from "../controllers/users.controller";
import { validateLogIn, validateRegister } from "../validators/users.validator";

export const userRouter = Router();

// Public Routes
userRouter.post("/register", validateRegister, register);
userRouter.post("/login", validateLogIn, login);
