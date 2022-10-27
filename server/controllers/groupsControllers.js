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
// const test = require("../files");
const deleteFiles = () => {
  const dir = join(dirname(require.main.filename) + "/files");

  readdirSync(dir).forEach((f) => rmSync(`${dir}/${f}`));
};

exports.createGroup = catchAsync(async (req, res, next) => {
  const test2 = await Image.findOne({
    $or: [{ name: req.body.name }, { Key: req.files[0].originalname }],
  });
  console.log(test2);
  if (test2) {
    deleteFiles();
    return next(
      new AppError(
        "there is another group/code with the same code/group/Key name",
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

  let small = `https://ik.imagekit.io/rr0ybvdll/tr:w-100,h-100/${params.Key}`;
  console.log(req.files);

  let newGroup = await Image.create({
    Key: req.files[0].originalname,
    name: req.body.name,
    sizes: {
      original: `https://${params.Bucket}.fra1.digitaloceanspaces.com/${params.Key}`,
      small: small,
    },

    genre: "Group",
    size: req.body.size,
  });

  const result = s3Client.send(new PutObjectCommand(params));
  deleteFiles();
  res.status(201).json({
    status: "success",
    data: newGroup,
  });
});

exports.getOneGroup = catchAsync(async (req, res, next) => {
  // req.params.code.split(",").forEach((el) => el);
  const image = await Image.findOne({ groupName: req.params.code });

  if (!image) {
    return next(new AppError(`no image found with the Code provided`, 404));
  }

  res.status(200).json({
    status: "success",
    data: image,
  });
});
exports.deleteManyGroups = catchAsync(async (req, res, next) => {
  let test = req.params.code.split(",");
  console.log(test);
  let test2 = await Image.find({ code: { $in: test } }).select({
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
  const groups = await Image.deleteMany({ groupCategory: { $in: test } });
  const images = await Image.deleteMany({
    code: { $in: test },
  });

  res.status(204).json({
    status: "success",
  });
});

exports.updateGroup = catchAsync(async (req, res, next) => {
  const doc = await Image.findOneAndUpdate(
    { name: req.params.code },
    req.body,
    {
      new: true,
    }
  );

  if (!doc) {
    return next(new AppError("No Group found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});
exports.hideGroup = catchAsync(async (req, res, next) => {
  let groups = req.params.code.split(",");

  await Image.updateMany(
    { name: { $in: groups } },
    { active: req.body.active }
  );

  const result = await Image.find({ name: { $in: groups } });

  res.status(200).json({
    status: "success",
    data: result,
  });
});
