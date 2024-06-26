const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res, next) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName() }, token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  //compare password
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isMatch = await user.comparePassword(password);

  if (isMatch) {
    const token = user.createJWT();
    return res
      .status(StatusCodes.OK)
      .json({ user: { name: user.name }, token });
  }

  throw new BadRequestError("Password is wrong");
};

module.exports = {
  login,
  register,
};
