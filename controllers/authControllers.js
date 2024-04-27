const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const { User } = require("../models");

const { validationResult } = require("express-validator");

const authControllers = {};
//this is a test comment
authControllers.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, password: hashedPassword });
  const token = Jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
  return res
    .status(200)
    .json({ message: "User created succesfully", token: token });
};

authControllers.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return res
      .status(400)
      .json({ message: "User with given email does not exist!" });
  }

  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword)
    return res.status(400).json({ message: "Incorrect password!" });

  const userId = user.id;
  const token = Jwt.sign({ id: userId }, process.env.JWT_SECRET);

  res.status(200).json({
    message: "Login succesfull!",
    token: token,
    id: userId,
    email: user.email,
  });
};

module.exports = authControllers;
