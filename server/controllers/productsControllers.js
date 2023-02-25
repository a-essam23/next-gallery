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
const { getDimensions } = require("../utils/utility");

const deleteFiles = () => {
  const dir = join(dirname(require.main.filename) + "/files");

  readdirSync(dir).forEach((f) => rmSync(`${dir}/${f}`));
};
exports.createProduct = catchAsync(async (req, res, next) => {
  // console.log(path.join(path.dirname(require.main.filename) + "/files"));

  const checker = await Image.findOne({
    $or: [{ name: req.body.name }, { Key: req.files[0].originalname }],
  });

  const categoryChecker = await Image.findOne({
    $and: [{ name: req.body.category }, { genre: "category" }],
  });

  if (checker) {
    deleteFiles();
    return next(
      new AppError(
        "there is another Product with the same name/image that you provided",
        409
      )
    );
  }
  if (!categoryChecker) {
    return next(new AppError("category name does not exist", 404));
  }

  const { width, height } = getDimensions(req.files[0].path, 300);

  // const params = {
  //   Bucket: "failasof",
  //   Key: `${req.files[0].originalname}`,
  //   Body: fs.readFileSync(req.files[0].path),
  //   ACL: "public-read",
  // };

  // let small = `https://ik.imagekit.io/rr0ybvdll/tr:w-${width},h-${height}/${params.Key}`;

  let newProduct = await Image.create({
    Key: req.files[0].originalname,
    category: categoryChecker.category,
    name: req.body.name,
    createdBy: req.user.id,
    // sizes: {
    //   original: `https://${params.Bucket}.fra1.digitaloceanspaces.com/${params.Key}`,
    //   small: small,
    // },
    category: req.body.category,
    genre: "product",
    active: req.body.active,
  });

  // const result = s3Client.send(new PutObjectCommand(params));
  await Image.findOneAndUpdate(
    { name: req.body.category },
    { $push: { products: newProduct._id } },
    { new: true }
  );
  deleteFiles();
  res.status(201).json({
    status: "success",
    data: newProduct,
  });
});

exports.deleteManyProducts = factory.deleteElements(
  Image,
  "product",
  "products"
);
exports.getOneProduct = factory.getOne(Image, "product", "units");
exports.updateOneProduct = factory.update(Image);
exports.hideProducts = factory.hide(Image);
