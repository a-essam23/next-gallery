const catchAsync = require("../utils/catchAsync");
const {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");
const { s3Client } = require("../config/digitalOceans");
const fs = require("fs");
const { readdirSync, rmSync } = require("fs");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const factory = require("../our_modules/factoryHandler");
const Image = require("../models/imageModel");
const multer = require("multer");
const { dirname, join } = require("path");
const upload = require("../config/multerConfig");
const { resizeImage } = require("../middlewares/resizeImage");
const { getDimensions } = require("../our_modules/smallSteps");
const Logger = require("../services/logger.service");
const logger = new Logger("authController");
// const test = require("../files");
const deleteFiles = () => {
  const dir = join(dirname(require.main.filename) + "/files");

  readdirSync(dir).forEach((f) => rmSync(`${dir}/${f}`));
};

exports.createMaingroup = catchAsync(async (req, res, next) => {
  const test2 = await Image.findOne({
    $or: [{ name: req.body.name }, { Key: req.files[0].originalname }],
  });
  // console.log(test2);
  if (test2) {
    deleteFiles();
    return next(
      new AppError(
        "there is another maingroup/code with the same code/group/Key name",
        409
      )
    );
  }

  const params = {
    Bucket: "failasof",
    Key: `${req.files[0].originalname}`,
    Body: fs.readFileSync(req.files[0].path),
    ACL: "public-read",
  };
  const { width, height } = getDimensions(req.files[0].path, 300);

  let small = `https://ik.imagekit.io/rr0ybvdll/tr:w-${width},h-${height}/${params.Key}`;
  // console.log(req.files);

  let newGroup = await Image.create({
    Key: req.files[0].originalname,
    name: req.body.name,
    sizes: {
      original: `https://${params.Bucket}.fra1.digitaloceanspaces.com/${params.Key}`,
      small: small,
    },

    genre: "maingroup",
  });

  const result = s3Client.send(new PutObjectCommand(params));
  deleteFiles();
  res.status(201).json({
    status: "success",
    data: newGroup,
  });
});

exports.getOneMaingroup = catchAsync(async (req, res, next) => {
  // req.params.code.split(",").forEach((el) => el);
  const group = await Image.findOne({ name: req.params.code }).select({
    images: 0,
    comments: 0,
  });
  if (!group) {
    return next(new AppError(`no group found with the Code provided`, 404));
  }
  // console.log(image.folders);
  group.folders = await Image.find({ _id: { $in: group.folders } });

  res.status(200).json({
    status: "success",
    data: group,
  });
});

exports.deleteManyMaingroups = catchAsync(async (req, res, next) => {
  let maingroupsnames = req.params.code.split(",");

  let arrayOfGroups = await Image.find({
    $and: [{ name: { $in: maingroupsnames } }, { genre: "maingroup" }],
  }).select({
    Key: 1,
    _id: 0,
  });

  const params = {
    Bucket: "failasof",
    Delete: {
      Objects: arrayOfGroups,
    },
  };

  await s3Client.send(
    new DeleteObjectsCommand(params, function (err, data) {
      if (err) {
        console.log("err", err);
      }
      console.log("data", data);
    })
  );
  const maingroups = await Image.deleteMany({ name: { $in: maingroupsnames } });
  //delete the groups inside the maingroup
  //delete folders inside the groups
  //delete the images inside this folders
  const images = await Image.deleteMany({
    name: { $in: maingroupsnames },
  });

  res.status(204).json({
    status: "success",
  });
});

exports.hideMaingroup = factory.hide(Image);
exports.deleteMaingroup = factory.deleteOne(Image);
exports.updateMaingroup = factory.update(Image);
