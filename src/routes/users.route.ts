import { Router } from "express";

import { login, register } from "../controllers/users.controller";

export const router = Router();

// Public Routes
router.post("/register", register);
router.post("/login", login);
