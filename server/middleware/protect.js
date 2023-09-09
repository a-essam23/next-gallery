const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
// const { logger } = require("../logger");

class Protect {
    constructor() {}

    // is logged in

    loggedIn = catchAsync(async (req, res, next) => {
        const session = req.session;
        if (!session._id) {
            return next(new AppError(401, "Failed to authenticate"));
        }
        const user = await User.findById(session._id);
        if (!user) {
            return next(new AppError(401, "Failed to authenticate"));
        }
        next();
    });

    admin = catchAsync(async (req, res, next) => {
        // logger.error({
        //     message: `Requesting admin auth`,
        //     labels: {
        //         task: "authorization",
        //         operation: "admin",
        //     },
        // });
        const session = req.session;
        if (!session._id) {
            return next(new AppError(401, "Failed to authenticate"));
        }
        const user = await User.findById(session._id);
        if (!user) {
            return next(new AppError(401, "Failed to authenticate"));
        }
        if (user.role !== "admin")
            return next(new AppError(401, "Failed to authenticate"));
        next();
    });
}

module.exports = new Protect();
