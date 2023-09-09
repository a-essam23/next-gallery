const { default: mongoose } = require("mongoose");
const Category = require("../models/Category");
const Group = require("../models/Group");
const { ControllerFactory } = require("../utils/ControllerFactory");
const AppError = require("../utils/appError");
const {
    uploadOneToSpaces,
    uploadFileToSpaces,
} = require("../utils/uploadToCloud");

const Controller = new ControllerFactory(Group);

//TODO on any delete dec childCount

const postOneHandler = async (req, res, next, doc) => {
    const category = await Category.findOneAndUpdate(
        { _id: doc.category },
        {
            $push: { groups: doc._id },
            $inc: { childCount: 1 },
        },
        { new: true }
    );
    doc.path = category.name;
    uploadOneToSpaces("cover", ["category"])(req, res, next, doc); // Invoke uploadOneToSpaces function
    return;
};
module.exports.getOne = Controller.getOne({
    required: ["name"],
    populate: ["albums", "category"],
});

module.exports.deleteOne = Controller.deleteOne({
    required: ["name"],
});

module.exports.getAll = Controller.getAll({
    populate: ["albums", "category"],
});

module.exports.sample = Controller.sample({
    required: [{ name: "size", parse: (val) => parseInt(val) }],
});

module.exports.postOne = Controller.postOne(
    {
        body: {
            required: [
                "name",
                {
                    name: "cover",
                    parse: (file) => ({ filename: file.originalname }),
                },
                {
                    name: "category",
                    parse: async (val) => {
                        const category = await Category.findOne({
                            name: val,
                        });
                        if (!category) {
                            throw new AppError(
                                400,
                                "Target category could not be found"
                            );
                        }
                        return category._id;
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