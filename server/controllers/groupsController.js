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
const { getDimensions } = require("../utils/utility");

const Logger = require("../services/logger.service");
const logger = new Logger("GroupController");

const deleteFiles = () => {
  const dir = join(dirname(require.main.filename) + "/files");

  readdirSync(dir).forEach((f) => rmSync(`${dir}/${f}`));
};

exports.createGroup = catchAsync(async (req, res, next) => {
  const test2 = await Image.findOne({
    $or: [{ name: req.body.name }, { Key: req.files[0].originalname }],
  });

  if (test2) {
    deleteFiles();
    return next(
      new AppError(
        "there is another Group/code with the same code/group/Key name",
        409
      )
    );
  }

  // const params = {
  //   Bucket: "failasof",
  //   Key: `${req.files[0].originalname}`,
  //   Body: fs.readFileSync(req.files[0].path),
  //   ACL: "public-read",
  // };
  const { width, height } = getDimensions(req.files[0].path, 300);

  // let small = `https://ik.imagekit.io/rr0ybvdll/tr:w-${width},h-${height}/${params.Key}`;

  let newGroup = await Image.create({
    Key: req.files[0].originalname,
    name: req.body.name,
    // sizes: {
    //   original: `https://${params.Bucket}.fra1.digitaloceanspaces.com/${params.Key}`,
    //   small: small,
    // },

    genre: "group",
  });

  // const result = s3Client.send(new PutObjectCommand(params));
  deleteFiles();
  res.status(201).json({
    status: "success",
    data: newGroup,
  });
});

exports.getOneGroup = factory.getOne(Image, "group", "categorys");
exports.deleteManyGroups = factory.deleteElements(Image, "group", "groups");
exports.hideGroup = factory.hide(Image);
exports.deleteGroup = factory.deleteOne(Image);
exports.updateGroup = factory.update(Image);
