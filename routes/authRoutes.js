const express = require("express");
const { body } = require("express-validator");
const authControllers = require("../controllers/authControllers");

const authRoute = express.Router();

authRoute.post(
  "/register",
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Enter valid email")
    .bail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters long")
    .bail(),

  authControllers.signup
);

authRoute.post("/login", authControllers.login);

module.exports = authRoute;
