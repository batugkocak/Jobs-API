const login = async (req, res, next) => {
  res.send("Login User");
};

const register = async (req, res, next) => {
  res.send("Register User");
};

module.exports = {
  login,
  register,
};
