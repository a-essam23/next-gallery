const { default: mongoose } = require("mongoose");
const Album = require("../models/Album");
const Group = require("../models/Group");
const Category = require("../models/Category");
const { ControllerFactory } = require("../utils/ControllerFactory");
const AppError = require("../utils/appError");
const {
    uploadOneToSpaces,
    uploadFileToSpaces,
} = require("../utils/uploadToCloud");

const Controller = new ControllerFactory(Album);

const postOneHandler = async (req, res, next, doc) => {
    const group = await Group.findOneAndUpdate(
        { _id: doc.group },
        {
            $push: { albums: doc._id },
            $inc: { childCount: 1 },
        },
        { new: true }
    );
    await Category.findOneAndUpdate(
        { _id: group.category },
        { $inc: { childCount: 1 } }
    );
    doc.category = group.category;
    doc.path = `${group.path}/${group.name}`;
    uploadOneToSpaces("cover", ["group", "category"])(req, res, next, doc); // Invoke uploadOneToSpaces function
    return doc;
};

module.exports.getOne = Controller.getOne({
    required: ["name"],
    populate: ["images"],
});

module.exports.deleteOne = Controller.deleteOne({
    required: ["name"],
});

module.exports.getAll = Controller.getAll({
    populate: ["images"],
});

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
                    name: "group",
                    parse: async (val) => {
                        const group = await Group.findOne({
                            name: val,
                        });
                        if (!group) {
                            throw new AppError(
                                400,
                                "Target group could not be found"
                            );
                        }
                        return group._id;
                    },
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
        ],
    },
});