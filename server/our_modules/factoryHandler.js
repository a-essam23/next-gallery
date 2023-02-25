const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const {
  S3Client,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");
const { dirname, join } = require("path");
const path = require("path");
const { readdirSync, rmSync } = require("fs");
const { s3Client } = require("../config/digitalOceans");
const { generateKeyPair } = require("crypto");
const { getDimensions } = require("../utils/utility");
const deleteFiles = () => {
  const dir = join(dirname(require.main.filename) + "/files");

  readdirSync(dir).forEach((f) => rmSync(`${dir}/${f}`));
};

exports.create = (
  Model,
  genre,
  genrePlural,
  parent,
  grandparent,
  grandgrandparent
) =>
  catchAsync(async (req, res, next) => {
    // 1
    // checker which takes a Key and a name then search for this name & key in the database if it exists
    const checker = await Model.findOne({
      $or: [{ name: req.body.name }, { Key: req.files[0].originalname }],
    });
    // 2
    // if condition if this checker exists
    console.log(checker, "checker");
    if (checker) {
      deleteFiles();
      return next(
        new AppError(`there is another ${genre} with the same name`, 409)
      );
    }
    // 3
    // searchs for the parent name if it exists
    const parentChecker = await Model.findOne({
      $and: [{ name: req.body[parent] }, { genre: parent }],
    });
    console.log(parentChecker, "parentchecker");
    // 4
    // an if condition if the parent name doesn't exist or if its invalid
    if (!parentChecker) {
      return next(
        new AppError(
          `every ${genre} must have an existing ${parent} name `,
          409
        )
      );
    }
    // 5
    // getting the grandparent name
    const grandParentFinder = await Model.findOne({
      $and: [{ name: parentChecker[grandparent] }, { genre: grandparent }],
    });
    if (!grandParentFinder) {
      grandParentFinder[grandgrandparent] = null;
    }
    // 6
    // resizing images
    const { width, height } = getDimensions(req.files[0].path, 300);
    // 7
    // creating a new file which consists of
    // A - Key
    // B - name
    // C - grandparent's father
    // D - grandparent
    // E - parent
    // F - dimensions of the file
    // G - active status
    // H - created by
    // I - size
    // J - genre

    console.log(grandParentFinder);
    let newFile = await Model.create({
      Key: req.files[0].originalname,
      name: req.body.name,
      [grandgrandparent]: grandParentFinder[grandgrandparent],
      [grandparent]: parentChecker[grandparent],
      [parent]: req.body[parent],
      // sizes: {
      //   original: `https://${params.Bucket}.fra1.digitaloceanspaces.com/${params.Key}`,
      //   small: `https://ik.imagekit.io/rr0ybvdll/tr:w-${width},h-${height}/${params.Key}`,
      // },
      active: req.body.active,
      createdBy: req.user.id,
      size: req.body.size,
      genre: genre,
    });
    console.log(newFile);
    // 8 -
    // deleting the file
    // s3Client.send(new PutObjectCommand(params));
    await Model.findOneAndUpdate(
      { name: req.body[parent] },
      { $push: { [genrePlural]: newFile._id } },
      { new: true }
    );
    deleteFiles();
    res.status(201).json({
      status: "Creating new document has been successed!",
      data: {
        data: newFile,
      },
    });
  });

exports.getOne = (Model, genre, downlevel) =>
  catchAsync(async (req, res, next) => {
    let query = await Model.findOne({
      $and: [{ genre: genre }, { name: req.params.code }],
    });
    console.log(genre);
    if (!query) {
      return next(
        new AppError(`no ${genre} found with the Code provided`, 404)
      );
    }

    //TODO
    console.log(query[downlevel]);
    let test = (query[downlevel] = await Model.find({
      _id: { $in: query[downlevel] },
    }));

    res.status(200).json({
      status: "success",
      data: {
        data: query,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //EXECUTE QUERY
    console.log("test1");
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    res.status(200).json({
      status: "success",
      results: doc.length,

      data: { doc },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.params.code);
    const file = await Model.findOne({ name: req.params.code });
    console.log(file.folder);
    if (!file) {
      return next(new AppError("No document found with that ID", 404));
    }
    const params = {
      Bucket: "failasof",
      Key: `${file.Key}`,
    };
    s3Client.send(
      new DeleteObjectCommand(params, function (err, data) {
        if (err) {
          console.log("err", err);
        }
        console.log("data", data);
      })
    );
    //it is supposed to filter and search for the specific folder and delete the file inside its array of files
    // TODO FIX DELETING !
    await Model.findOneAndUpdate(
      { name: file.folder },
      { $pull: { files: file.name } },
      { new: true }
    );
    await file.deleteOne();
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.update = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.params);
    const doc = await Model.findOneAndUpdate(
      { name: req.params.code },
      { $set: req.body },
      { new: true }
    );

    if (req.body.name) {
      if (doc?.genre === "group") {
        doc.folders.forEach(async (folder) => {
          await Model.findOneAndUpdate(
            { name: folder },
            { $set: { group: req.body.name } },
            { new: true }
          );
        });
      } else if (doc?.genre === "folder") {
        doc.images.forEach(async (image) => {
          await Model.findOneAndUpdate(
            { name: image },
            { $set: { folder: req.body.name } },
            { new: true }
          );
        });
      }
    }

    if (!doc) {
      return next(new AppError("No Doc found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });
exports.hide = (Model) =>
  catchAsync(async (req, res, next) => {
    let doc = req.params.code.split(",");

    await Model.updateMany({ name: { $in: doc } }, { active: req.body.active });
    //the array of folders inside group
    const result = await Model.find({ name: { $in: doc } });
    res.status(200).json({
      status: "success",
      data: result,
    });
  });

exports.deleteElements = (Model, genre, downlevel) =>
  catchAsync(async (req, res, next) => {
    let elements = req.params.code.split(",");

    let arrayOfelements = await Model.find({
      $and: [{ name: { $in: elements } }, { genre: genre }],
    }).select({
      Key: 1,
      _id: 0,
    });

    let arrayOfIds = await Model.find({
      $and: [{ name: { $in: elements } }, { genre: genre }],
    }).select({
      _id: 1,
    });

    // const params = {
    //   Bucket: process.env.BUCKET_NAME,
    //   Delete: {
    //     Objects: arrayOfelements,
    //   },
    // };
    // await s3Client.send(
    //   new DeleteObjectsCommand(params, function (err, data) {
    //     if (err) {
    //       console.log("err", err);
    //     }
    //     console.log("data", data);
    //   })
    // );
    let parent = await Model.findOne({ name: elements[0] });
    let result = [];
    for (let i = 0; i < arrayOfIds.length; i++) {
      result.push(arrayOfIds[i]._id);
    }

    //consider updating different types of things after deleting the insides of it
    //consider deleting the components and its comments

    await Model.findOneAndUpdate(
      { name: parent[genre] },
      { $pull: { [downlevel]: { $in: result } } },
      { new: true }
    );
    await Model.deleteMany({ [genre]: { $in: elements } });
    await Model.deleteMany({
      name: { $in: elements },
    });
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
