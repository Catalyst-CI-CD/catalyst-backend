import { Router } from "express";

import { login, register } from "../controllers/users.controller";

export const userRouter = Router();

// Public Routes
userRouter.post("/register", register);
userRouter.post("/login", login);
