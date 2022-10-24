const AppError = require("../utils/appError");

exports.isAuthMiddleware = function (req, res, next) {
  return !req.isAuthenticated()
    ? next(new AppError("You must log in", 401))
    : next();
};

exports.restrictTo = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError(`you aren't authorized to do such things!`));
    }
    next();
  };
};
