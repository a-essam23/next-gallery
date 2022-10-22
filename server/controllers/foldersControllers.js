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
const upload = require("../config/multerConfig");
const deleteFiles = () => {
  const dir = "./files/";

  readdirSync(dir).forEach((f) => rmSync(`${dir}/${f}`));
};
exports.createFolder = catchAsync(async (req, res, next) => {
  const test = await Image.findOne({
    $or: [{ code: req.body.code }, { Key: req.files[0].originalname }],
  });
  const test2 = await Image.findOne({ groupName: req.body.groupCategory });
  if (test) {
    deleteFiles();
    return next(
      new AppError("there is another code/Key with the same code/Key name", 409)
    );
  }
  if (!test2) {
    return next(
      new AppError(
        "the folder you provided does not belong to any existing group",
        404
      )
    );
  }
  const params = {
    Bucket: "failasof",
    Key: `${req.files[0].originalname}`,
    Body: fs.readFileSync(req.files[0].path),
    ACL: "public-read",
  };

  let small = `https://ik.imagekit.io/rr0ybvdll/tr:w-100,h-100/${params.Key}`;

  let newFolder = await Image.create({
    Key: req.files[0].originalname,

    code: req.body.code,
    folderName: req.body.code,
    createdBy: req.user.id,
    originalSize: `https://${params.Bucket}.fra1.digitaloceanspaces.com/${params.Key}`,
    small300x300: small,
    groupCategory: req.body.groupCategory,
    genre: "Folder",
    size: req.body.size,
  });

  const result = s3Client.send(new PutObjectCommand(params));
  await Image.findOneAndUpdate(
    { groupName: req.body.groupCategory },
    { $push: { folders: newFolder.code } },
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
  const folder = await Image.findOne({ folderName: req.params.code });

  if (!folder) {
    return next(new AppError(`no folder found with the name provided`, 404));
  }

  res.status(200).json({
    status: "success",
    data: folder,
  });
});

exports.updateOneFolder = catchAsync(async (req, res, next) => {
  const folder = await Image.findOneAndUpdate(
    { folderName: req.params.code },
    req.body,
    {
      new: true,
    }
  );
  if (!folder || req.params.code === undefined) {
    return next(new AppError(`no folder found with the name provided`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      folder,
    },
  });
});

exports.deleteManyFolders = catchAsync(async (req, res, next) => {
  let test = req.params.code.split(",");

  let test2 = await Image.find({ groupName: { $in: test } }).select({
    Key: 1,
    _id: 0,
  });

  const params = {
    Bucket: "failasof",
    Delete: {
      Objects: test2,
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
  let tata = await Image.findOne({ code: test[0] });
  console.log(tata.groupCategory);
  await Image.findOneAndUpdate(
    { groupName: tata.groupCategory },
    { $pull: { folders: { $in: test } } },
    { new: true }
  );
  const images = await Image.deleteMany({ folderName: { $in: test } });

  res.status(204).json({
    status: "success",
  });
});
