const User = require("../models/User");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.register = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        password: req.body.password,
        // passwordConfirm: req.body.passwordConfirm,
    });

    req.session.name = newUser.name;
    req.session._id = newUser._id;
    req.session.role = newUser.role;
    res.status(200).send({
        data: { name: newUser.name, role: newUser.role, _id: newUser._id },
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { name, password } = req.body;
    if (!name) throw new AppError(400, "Please provide a valid name");
    if (!password) throw new AppError(400, "Please provide a valid password");
    const user = await User.findOne({ name }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
        console.log(name + "logging in failed");
        return next(new AppError(401, "Incorrect name or password"));
    }
    console.log(`${user.name} logged in`);
    req.session.name = user.name;
    req.session._id = user._id;
    req.session.role = user.role;
    res.status(200).send({
        data: { name: user.name, role: user.role, _id: user._id },
    });
});

exports.logout = catchAsync(async (req, res, next) => {
    const session = req.session;
    if (!session._id) return next(new AppError(400, "No logged in user found"));
    const user = await User.findById(session._id);
    if (!user) {
        session.name = undefined;
        session._id = undefined;
        session.role = undefined;
        return next(new AppError(500, "user not found"));
    }
    session.name = undefined;
    session._id = undefined;
    session.role = undefined;
    res.status(200).send({ message: "logout successful" });
});
