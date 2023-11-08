import { body } from "express-validator";
import { handleValidation } from "./validate.validator";

export const validateRegister = (function () {
  return [
    body("username")
      .isLength({ min: 1, max: 50 })
      .withMessage("username must be between 1 and 50 characters long")
      .matches(/^[A-Za-z0-9_]+$/)
      .withMessage("username must be alphanumeric only")
      .trim()
      .escape(),

    body("name")
      .isLength({ min: 1, max: 50 })
      .withMessage("name must be between 1 and 50 characters long")
      .trim()
      .escape(),

    body("email").isEmail().withMessage("Invalid email format"),

    body("password")
      .isLength({ min: 5, max: 30 })
      .withMessage("Password must be between 5 and 30 characters long")
      .matches(/\d/)
      .withMessage("Password must contain a number"),
    handleValidation,
  ];
})();

export const validateLogIn = (function () {
  return [
    body("email").isEmail().withMessage("Invalid email format"),

    body("password")
      .isLength({ min: 5, max: 30 })
      .withMessage("Password must be between 5 and 30 characters long")
      .matches(/\d/)
      .withMessage("Password must contain a number"),
    handleValidation,
  ];
})();
