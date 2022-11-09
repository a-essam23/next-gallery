const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const {
    S3Client,
    DeleteObjectCommand,
    DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");
const { s3Client } = require("../config/digitalOceans");
exports.create = (Model) =>
    catchAsync(async (req, res, next) => {
        const newModel = await Model.create(req.body);

        res.status(201).json({
            status: "Creating new document has been successed!",
            data: {
                data: newModel,
            },
        });
    });
exports.getOne = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        let query = Model.findOneAndUpdate({ name: req.params.code });

        if (popOptions) query = await query.populate(popOptions);
        const doc = await query;

        if (!doc) {
            return next(new AppError("No document found with this ID", 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });

// exports.getOne = (Model, populate ) =>
//   catchAsync(async (req, res, next) => {
//     // req.params.code.split(",").forEach((el) => el);
//     const doc = await Model.findOne({ name: req.params.code });
//     // console.log(Model.folders);
//     populate = await Model.find({ name: { $in: populate } });

//     if (!doc) {
//       return next(new AppError(`no doc found with the Code provided`, 404));
//     }

//     res.status(200).json({
//       status: "success",
//       data: doc,
//     });
//   });
exports.getAll = (Model) =>
    catchAsync(async (req, res, next) => {
        //EXECUTE QUERY
        const features = new APIFeatures(Model.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const doc = await features.query;
        // if (doc.length < 1) {
        //   return next(new AppError(`We couldn't find any results for your input`));
        // }
        // for (let i = 0; i < doc.length; i++) {

        // console.log(({ name: doc[i].Key } = doc));
        // }
        // const test = { name: doc[0].Key };
        // console.log(test);
        res.status(200).json({
            status: "success",
            results: doc.length,

            data: { doc },
        });
    });
// exports.delete = (Model) =>
//   catchAsync(async (req, res, next) => {
//     const doc = await Model.findByIdAndDelete(req.params.id);

//     if (!doc) {
//       return next(new AppError("No document found with that ID", 404));
//     }
//     res.status(204).json({
//       status: "success",
//       data: null,
//     });
//   });

exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
        console.log(req.params.code);
        const image = await Model.findOne({ name: req.params.code });
        console.log(image.folder);
        if (!image) {
            return next(new AppError("No document found with that ID", 404));
        }
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
        //it is supposed to filter and search for the specific folder and delete the image inside its array of images

        await Model.findOneAndUpdate(
            { name: image.folder },
            { $pull: { images: image.name } },
            { new: true }
        );
        await image.deleteOne();
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

        await Model.updateMany(
            { name: { $in: doc } },
            { active: req.body.active }
        );
        //the array of folders inside group
        const result = await Model.find({ name: { $in: doc } });
        res.status(200).json({
            status: "success",
            data: result,
        });
    });
exports.deleteElements = (Model, genre) =>
    catchAsync(async (req, res, next) => {
        let elements = req.params.code.split(",");

        let arrayOfelements = await Model.find({
            $and: [{ name: { $in: elements } }, { genre: genre }],
        }).select({
            Key: 1,
            _id: 0,
        });
        let container = await Model.findOne({ name: elements[0] });
        let test;
        if (genre === "image") {
            test = container.folder;
        }
        if (genre === "folder") {
            test = container.group;
        }

        const params = {
            Bucket: process.env.BUCKET_NAME,
            Delete: {
                Objects: arrayOfelements,
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

        await Model.findOneAndUpdate(
            { name: container.folder },
            { $pull: { images: { $in: elements } } },
            { new: true }
        );

        // const images = await Image.deleteMany({ name: { $in: elements } });

        res.status(204).json({
            status: "success",
            data: null,
        });
    });
