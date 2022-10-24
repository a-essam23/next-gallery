const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: users,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return next("no user found with this id", 404);
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return next("no user found with this id", 404);
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return next("no user found with this id", 404);
  }
  const deletedUser = await User.findByIdAndUpdate(
    req.params.userId,
    { $set: { active: false } },
    { new: true }
  );
  res.status(200).json({
    status: "success",
  });
});
