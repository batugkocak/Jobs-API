const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const login = async (req, res, next) => {
  res.send("Login User");
};

const register = async (req, res, next) => {
  // // This is unnesasary because Mongoose already cheks if there are validation errors.
  // // There will be some cases that we will validate things in the controller but this is not one of them.
  // const { name, email, password } = req.body;
  // if (!name || !email || !password) {
  //   throw new BadRequestError("Please provide name, email and password!");
  // }
  // const user = await User.create({ ...req.body });
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user });
};

module.exports = {
  login,
  register,
};
