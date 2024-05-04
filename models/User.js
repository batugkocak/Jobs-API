const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be provided!"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Email must be provided!"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password must be provided!"],
    minlength: 6,
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getName = function () {
  return this.name;
};

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

// Bcrypt hides the salt, within the password while hashing
// For the same password, password hashes is:
// 1- $2a$10$45RdRWov13Rt1GK0DsZLrOADiS/bLqNCF009sBQeA8WCR4/9OFxOG
// 2- $2a$10$mDm8hDTefVvFseoTJnSLSuDvgmw2vWiSzqwvMrDh8JCIDqRa/r2Au
// and the saltes is:
// $2a$10$45RdRWov13Rt1GK0DsZLrO
// $2a$10$mDm8hDTefVvFseoTJnSLSu
// So salt is actually is IN the password, first x character is salt
// and the other characters are : hash(salt+password)
userSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("User", userSchema);
