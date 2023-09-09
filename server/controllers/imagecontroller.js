const Image = require("../models/Image");
const Album = require("../models/Album");
const { ControllerFactory } = require("../utils/ControllerFactory");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Category = require("../models/Category");
const Group = require("../models/Group");
const {
    uploadOneToSpaces,
    uploadFileToSpaces,
} = require("../utils/uploadToCloud");

const Controller = new ControllerFactory(Image);

const postOneHandler = async (req, res, next, doc) => {
    const album = await Album.findOneAndUpdate(
        { _id: doc.album },
        {
            $push: { images: doc._id },
        },
        { new: true }
    );
    await Category.findOneAndUpdate(
        { _id: album.category },
        { $inc: { childCount: 1 } }
    );
    await Group.findOneAndUpdate(
        { _id: album.group },
        { $inc: { childCount: 1 } }
    );
    doc.group = album.group;
    doc.category = album.category;
    doc.path = `${album.path}/${album.name}`;
    uploadOneToSpaces("cover", ["album", "group", "category"])(
        req,
        res,
        next,
        doc
    ); // Invoke uploadOneToSpaces function
    return doc;
};

module.exports.getOne = Controller.getOne({
    required: ["name"],
});

module.exports.deleteOne = Controller.deleteOne({
    required: ["name"],
});

module.exports.getAll = Controller.getAll({});

module.exports.sample = Controller.sample({
    required: [{ name: "size", parse: (val) => parseInt(val) }],
});

exports.postOne = Controller.postOne(
    {
        body: {
            required: [
                "name",
                {
                    name: "cover",
                    parse: (file) => ({ filename: file.originalname }),
                },
                {
                    name: "album",
                    parse: async (val) => {
                        const album = await Album.findOne({
                            name: val,
                        });
                        if (!album) {
                            throw new AppError(
                                400,
                                "Target group could not be found"
                            );
                        }
                        return album._id;
                    },
                },
                {
                    name: "length",
                    parent: "dimensions",
                },
                {
                    name: "width",
                    parent: "dimensions",
                },
                {
                    name: "depth",
                    parent: "dimensions",
                },
            ],
        },
    },
    postOneHandler
);

module.exports.updateOne = Controller.updateOne({
    query: {
        required: ["name"],
    },
    body: {
        optional: [
            "name",
            {
                name: "cover",
                parse: async (file) => {
                    if (!file?.originalname || !file?.size)
                        throw new AppError(400, "No image attached to request");
                    const filePath = await uploadFileToSpaces(file, "");
                    return {
                        filename: file.originalname,
                        url: filePath,
                    };
                },
            },
            "active",
            {
                name: "length",
                parent: "dimensions",
            },
            {
                name: "width",
                parent: "dimensions",
            },
            {
                name: "depth",
                parent: "dimensions",
            },
        ],
    },
});