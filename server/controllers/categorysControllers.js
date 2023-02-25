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
// const test = require("../files");
const deleteFiles = () => {
  const dir = join(dirname(require.main.filename) + "/files");

  readdirSync(dir).forEach((f) => rmSync(`${dir}/${f}`));
};

exports.createCategory = catchAsync(async (req, res, next) => {
  const categoryChecker = await Image.findOne({
    $or: [{ name: req.body.name }, { Key: req.files[0].originalname }],
  });
  const groupChecker = await Image.findOne({
    $and: [{ name: req.body.group }, { genre: "group" }],
  });

  // console.log(test2);
  if (categoryChecker) {
    deleteFiles();
    return next(
      new AppError(
        "there is another category/code with the same code/category/Key name",
        409
      )
    );
  }
  if (!groupChecker) {
    return next(new AppError("group name does not exist", 404));
  }
  // const params = {
  //   Bucket: "failasof",
  //   Key: `${req.files[0].originalname}`,
  //   Body: fs.readFileSync(req.files[0].path),
  //   ACL: "public-read",
  // };
  const { width, height } = getDimensions(req.files[0].path, 300);

  // let small = `https://ik.imagekit.io/rr0ybvdll/tr:w-${width},h-${height}/${params.Key}`;
  // console.log(req.files);

  let newcategory = await Image.create({
    Key: req.files[0].originalname,
    group: groupChecker.name,
    name: req.body.name,
    createdBy: req.user.id,
    // sizes: {
    //   original: `https://${params.Bucket}.fra1.digitaloceanspaces.com/${params.Key}`,
    //   small: small,
    // },
    group: req.body.group,
    genre: "category",
    active: req.body.active,
  });

  // const result = s3Client.send(new PutObjectCommand(params));
  await Image.findOneAndUpdate(
    { name: req.body.group },
    { $push: { categorys: newcategory._id } },
    { new: true }
  );
  deleteFiles();
  res.status(201).json({
    status: "success",
    data: newcategory,
  });
});

exports.getOneCategory = factory.getOne(Image, "category", "products");
exports.deleteManyCategorys = factory.deleteElements(
  Image,
  "category",
  "categorys"
);

exports.hideCategory = factory.hide(Image);
exports.deleteCategory = factory.deleteOne(Image);
exports.updateCategory = factory.update(Image);
