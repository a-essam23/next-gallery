const catchAsync = require("../utils/catchAsync");
const {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");
const { s3Client } = require("../config/digitalOceans");
const fs = require("fs");
const { dirname, join } = require("path");
const path = require("path");
const { readdirSync, rmSync } = require("fs");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const factory = require("../our_modules/factoryHandler");
const Image = require("../models/imageModel");
const multer = require("multer");
const upload = require("../config/multerConfig");

const deleteFiles = () => {
  const dir = join(dirname(require.main.filename) + "/files");

  readdirSync(dir).forEach((f) => rmSync(`${dir}/${f}`));
};
exports.createFolder = catchAsync(async (req, res, next) => {
  // console.log(path.join(path.dirname(require.main.filename) + "/files"));

  const checker = await Image.findOne({
    $or: [{ name: req.body.name }, { Key: req.files[0].originalname }],
  });

  const groupChecker = await Image.findOne({
    $and: [{ name: req.body.group }, { genre: "group" }],
  });

  if (checker) {
    deleteFiles();
    return next(
      new AppError(
        "there is another folder with the same name/image that you provided",
        409
      )
    );
  }
  if (!groupChecker) {
    return next(new AppError("group name does not exist", 404));
  }
  const params = {
    Bucket: "failasof",
    Key: `${req.files[0].originalname}`,
    Body: fs.readFileSync(req.files[0].path),
    ACL: "public-read",
  };

  let small = `https://ik.imagekit.io/rr0ybvdll/tr:w-${300},h-${300}/${
    params.Key
  }`;

  let newFolder = await Image.create({
    Key: req.files[0].originalname,

    name: req.body.name,
    createdBy: req.user.id,
    sizes: {
      original: `https://${params.Bucket}.fra1.digitaloceanspaces.com/${params.Key}`,
      small: small,
    },
    group: req.body.group,
    genre: "folder",
    active: req.body.active,
  });

  const result = s3Client.send(new PutObjectCommand(params));
  await Image.findOneAndUpdate(
    { name: req.body.group },
    { $push: { folders: newFolder._id } },
    { new: true }
  );
  deleteFiles();
  res.status(201).json({
    status: "success",
    data: newFolder,
  });
});

exports.getOneFolder = catchAsync(async (req, res, next) => {
  // req.params.code.split(",").forEach((el) => el);
  const folder = await Image.findOne({
    $and: [{ genre: "folder" }, { name: req.params.code }],
  }).select({ folders: 0, comments: 0 });
  if (!folder) {
    return next(new AppError(`no folder found with the name provided`, 404));
  }
  folder.images = await Image.find({ _id: { $in: folder.images } });
  res.status(200).json({
    status: "success",
    data: folder,
  });
});

exports.deleteManyFolders = catchAsync(async (req, res, next) => {
  let foldersnames = req.params.code.split(",");

  let arrayOfFolders = await Image.find({
    $and: [{ name: { $in: foldersnames } }, { genre: "folder" }],
  }).select({
    Key: 1,
    _id: 0,
  });
  let arrayOfIds = await Image.find({
    $and: [{ name: { $in: foldersnames } }, { genre: "folder" }],
  }).select({
    _id: 1,
  });
  const params = {
    Bucket: "failasof",
    Delete: {
      Objects: arrayOfFolders,
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
  let result = [];
  for (let i = 0; i < arrayOfIds.length; i++) {
    result.push(arrayOfIds[i]._id);
  }

  let group = await Image.findOne({ name: foldersnames[0] });

  await Image.findOneAndUpdate(
    { name: group.group },
    { $pull: { folders: { $in: result } } },
    { new: true }
  );

  await Image.deleteMany({ folder: { $in: foldersnames } });
  await Image.deleteMany({ name: { $in: foldersnames } });
  res.status(204).json({});
});

exports.updateOneFolder = factory.update(Image);
exports.hideFolders = factory.hide(Image);
