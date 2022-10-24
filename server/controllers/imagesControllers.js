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
const mongoose = require("../conf");
const deleteFiles = () => {
  const dir = "./files/";

  readdirSync(dir).forEach((f) => rmSync(`${dir}/${f}`));
};

//CRUD Operations
exports.createImage = catchAsync(async (req, res, next) => {
  const test = await Image.findOne({
    $or: [{ code: req.body.code }, { Key: req.files[0].originalname }],
  });
  const test2 = await Image.findOne({
    folderName: req.body.folderCategory,
  });

  if (test) {
    deleteFiles();
    return next(
      new AppError("there is another file/code with the same code/Key", 409)
    );
  }
  console.log(test2);
  if (!test2) {
    return next(
      new AppError(
        `every photo must have an existing folder/group category name `,
        409
      )
    );
  }
  //if statement for groupcategory // checker
  const params = {
    Bucket: "failasof",
    Key: `${req.files[0].originalname}`,
    Body: fs.readFileSync(req.files[0].path),
    ACL: "public-read",
  };

  let small = `https://ik.imagekit.io/rr0ybvdll/tr:w-100,h-100/${params.Key}`;
  // let medium = `https://ik.imagekit.io/rr0ybvdll/tr:w-300,h-300/${params.Key}`;
  // let random = `https://ik.imagekit.io/rr0ybvdll/tr:w-${width},h-${height}/${params.Key}`;

  let newImage = await Image.create({
    Key: req.files[0].originalname,

    code: req.body.code,
    groupCategory: test2.groupCategory,
    folderCategory: req.body.folderCategory,
    originalSize: `https://${params.Bucket}.fra1.digitaloceanspaces.com/${params.Key}`,
    small100x100: small,
    // medium300x300: medium,
    createdBy: req.user.id,
    size: req.body.size,
    genre: req.body.genre,
  });

  const result = s3Client.send(new PutObjectCommand(params));
  await Image.findOneAndUpdate(
    { folderName: req.body.folderCategory },
    { $push: { images: newImage.code } },
    { new: true }
  );
  deleteFiles();
  res.status(201).json({
    status: "success",
    data: newImage,
  });
});

exports.updateImage = catchAsync(async (req, res, next) => {
  const doc = await Image.findOneAndUpdate(
    { code: req.params.code },
    req.body,
    {
      new: true,
    }
  );

  if (!doc) {
    return next(new AppError("No Image found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});

exports.deleteImage = catchAsync(async (req, res, next) => {
  const image = await Image.findOne({ code: req.params.code });

  const params = {
    Bucket: "failasof",
    Key: `${image.Key}`,
  };
  s3Client.send(
    new DeleteObjectCommand(params, function (err, data) {
      if (err) {
        console.log("err", err);
      }
      console.log("data", data);
    })
  );
  await image.deleteOne();
  res.status(204).json({
    status: "success",
  });
});

exports.getOneImage = catchAsync(async (req, res, next) => {
  const image = await Image.findOne({ code: req.params.code });

  if (!image) {
    return next(new AppError(`no image found with the Code provided`, 404));
  }

  res.status(200).json({
    status: "success",
    data: image,
  });
});

exports.deleteImages = catchAsync(async (req, res, next) => {
  let test = req.params.code.split(",");

  console.log(test);
  let test2 = await Image.find({ code: { $in: test } }).select({
    Key: 1,
    _id: 0,
  });
  console.log(test2);

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

  await Image.findOneAndUpdate(
    { folderName: tata.folderCategory },
    { $pull: { images: { $in: test } } },
    { new: true }
  );

  const images = await Image.deleteMany({ code: { $in: test } });

  res.status(204).json({
    status: "success",
  });
});
exports.getAllImages = factory.getAll(Image);

exports.hideImages = catchAsync(async (req, res, next) => {
  let images = req.params.code.split(",");

  await Image.updateMany(
    { code: { $in: images } },
    { active: req.body.active }
  );
  //the array of folders inside group
  let result = await Image.find({ code: { $in: images } });
  res.status(200).json({
    status: "success",
    data: result,
  });
});

//exports.uploadMultipleImages
//exports.updateMultipleImages
