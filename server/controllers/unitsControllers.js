// const catchAsync = require("../utils/catchAsync");
// const {
//   PutObjectCommand,
//   S3Client,
//   DeleteObjectCommand,
//   DeleteObjectsCommand,
// } = require("@aws-sdk/client-s3");
// const { s3Client } = require("../config/digitalOceans");
// const fs = require("fs");
// const { dirname, join } = require("path");
// const path = require("path");
// const { readdirSync, rmSync } = require("fs");
// const AppError = require("../utils/appError");
// const APIFeatures = require("../utils/apiFeatures");
const factory = require("../our_modules/factoryHandler");
const Image = require("../models/imageModel");
// const multer = require("multer");
// const upload = require("../config/multerConfig");
// const Comment = require("../models/commentModel");
// const Jimp = require("jimp");
// const Logger = require("../services/logger.service");
// const logger = new Logger("unitController");

// const utility = require("../utils/utility");
// const deleteFiles = () => {
//   const dir = join(dirname(require.main.filename) + "/files");

//   readdirSync(dir).forEach((f) => rmSync(`${dir}/${f}`));
// };

// const Jimp = require("jimp");
// const { getDimensions } = require("../utils/utility");
// const { dateFormat } = require("../utils/utility");

exports.createUnit = factory.create(
  Image,
  "unit",
  "units",
  "product",
  "category",
  "group"
);
exports.getAllUnits = factory.getAll(Image);
exports.hideUnits = factory.hide(Image);
exports.updateUnits = factory.update(Image);
exports.deleteOneUnit = factory.deleteOne(Image);
exports.deleteManyUnits = factory.deleteElements(Image, "unit", "units");
exports.getOneUnit = factory.getOne(Image, "units");
