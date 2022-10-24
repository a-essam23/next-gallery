import AppError from "../utils/appError";

export function isAuthMiddleware(req, res, next) {
  return !req.isAuthenticated()
    ? next(new AppError("You must be log in"))
    : next();
}

export function restrictTo(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError(`you aren't authorized to do such things!`));
    }
    next();
  };
}
