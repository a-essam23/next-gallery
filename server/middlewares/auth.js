const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// exports.isAuthMiddleware = function (req, res, next) {
//   return !req.isAuthenticated()
//     ? next(new AppError("You must log in", 401))
//     : next();
// };

// exports.isAuthMiddleware = function (req, res, next) {
//   res.locals.currentUser = req.user;
//   next();
// };

exports.restrictTo = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError(`you aren't authorized to do such things!`));
    }
    next();
  };
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError(`You aren't logged in,please log in to get access.`, 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "the user belonging to this token does no longer exist.",
        401
      )
    );
  }

  if (currentUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }
  req.user = currentUser;

  next();
});
