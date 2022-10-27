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

// const Jimp = require("jimp");
const deleteFiles = () => {
  const dir = join(dirname(require.main.filename) + "/files");

  readdirSync(dir).forEach((f) => rmSync(`${dir}/${f}`));
};

const Jimp = require("jimp");

exports.createImage = catchAsync(async (req, res, next) => {
  const checker = await Image.findOne({
    $or: [{ name: req.body.name }, { Key: req.files[0].originalname }],
  });
  const folderChecker = await Image.findOne({
    $and: [{ name: req.body.folder }, { genre: "Folder" }],
  });
  // async function resize() {
  //   // Reading Image
  //   const image = await Jimp.read(
  //     dirname(require.main.filename) + `/files/${req.files[0].originalname}`
  //   );

  //   // Used RESIZE_BEZIER as cb for finer images
  //   image
  //     .resize(300, 300, Jimp.RESIZE_BEZIER, function (err) {
  //       if (err) throw err;
  //     })
  //     .write(`./server/files/small/${req.files[0].originalname}`);
  //   console.log("done");
  // }

  // resize();
  console.log("Image is processed successfully");
  if (checker) {
    deleteFiles();
    return next(new AppError("there is another image with the same name", 409));
  }

  if (!folderChecker) {
    return next(
      new AppError(`every photo must have an existing folder name `, 409)
    );
  }
  //if statement for groupcategory // checker
  const params = {
    Bucket: "failasof",
    Key: `${req.files[0].originalname}`,
    Body: fs.readFileSync(req.files[0].path),
    ACL: "public-read",
  };
  // const params2 = {
  //   Bucket: "failasof",
  //   Key: `small${req.files.originalname}`,
  //   Body: fs.readFileSync(req.files[0].path),
  //   ACL: "public-read",
  // };

  let newImage = await Image.create({
    Key: req.files[0].originalname,
    name: req.body.name,
    // group: folderChecker.group,
    folder: req.body.folder,
    sizes: {
      original: `https://${params.Bucket}.fra1.digitaloceanspaces.com/${params.Key}`,
      small: `https://ik.imagekit.io/rr0ybvdll/tr:w-100,h-100/${params.Key}`,
    },

    // createdBy: req.user.id,
    size: req.body.size,
    genre: "Image",
  });
  // s3Client.send(new PutObjectCommand(params2));
  s3Client.send(new PutObjectCommand(params));
  await Image.findOneAndUpdate(
    { name: req.body.folder },
    { $push: { images: newImage.name } },
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
    { name: req.params.code },
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
  const image = await Image.findOne({ name: req.params.name });

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
  const image = await Image.findOne({ name: req.params.code });

  if (!image) {
    return next(new AppError(`no image found with the Name provided`, 404));
  }

  res.status(200).json({
    status: "success",
    data: image,
  });
});

exports.deleteImages = catchAsync(async (req, res, next) => {
  let test = req.params.code.split(",");
  console.log(test);
  let test2 = await Image.find({
    $and: [{ name: { $in: test } }, { genre: "Image" }],
  }).select({
    Key: 1,
    _id: 0,
  });
  console.log(test2, "test2");
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
  let tata = await Image.findOne({ name: test[0] });
  console.log(tata.folder, "tata");
  console.log(test[0].folder, "folder");
  await Image.findOneAndUpdate(
    { name: tata.folder },
    { $pull: { images: { $in: test } } },
    { new: true }
  );

  // const images = await Image.deleteMany({ name: { $in: test } });

  res.status(204).json({
    status: "success",
  });
});
exports.getAllImages = factory.getAll(Image);

exports.hideImages = catchAsync(async (req, res, next) => {
  let images = req.params.code.split(",");

  await Image.updateMany(
    { name: { $in: images } },
    { active: req.body.active }
  );
  //the array of folders inside group
  let result = await Image.find({ name: { $in: images } });
  res.status(200).json({
    status: "success",
    data: result,
  });
});
