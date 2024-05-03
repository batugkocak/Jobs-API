const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const bcrypt = require("bcryptjs");

const login = async (req, res, next) => {
  res.send("Login User");
};

const register = async (req, res, next) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user });
};

module.exports = {
  login,
  register,
};
