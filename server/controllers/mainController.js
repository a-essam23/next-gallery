const catchAsync = require("../utils/catchAsync");
const Main = require("../models/mainModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const factory = require("../our_modules/factoryHandler");

exports.getMainPage = catchAsync(async (req, res, next) => {
  const data = await Main.find();

  res.status(200).json({
    status: "success",
    data: data,
  });
});
exports.createMainPage = catchAsync(async (req, res, next) => {
  const main = await Main.create(req.body);

  res.status(201).json({
    status: "success",
    data: main,
  });
});
exports.deleteMainPage = factory.deleteOne(Main);
exports.updateMain = factory.update(Main);
exports.getOneMain = factory.getOne(Main);
