const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const crypto = require("crypto");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  // const cookieOptions = {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),

  //   httpOnly: true,
  // };

  // if (process.env.NODE_ENV === "production") {
  //     cookieOptions.secure = true;
  // }

  // user.password = undefined;

  // res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("incorrect email or password", 401));
  }
  createSendToken(user, 201, res);
});

const passport = require("passport");

// exports.login = (req, res, next) => {
//   res.status(200).json({
//     status: "success",
//     data: req.user,
//   });
// };

exports.googleLogin = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: req.user,
  });
};

exports.facebookLogin = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: req.user,
  });
};

exports.logout = (req, res, next) => {
  // req.logOut();
  // req.
};
