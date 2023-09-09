const Category = require("../models/Category");
const { ControllerFactory } = require("../utils/ControllerFactory");
const {
    uploadOneToSpaces,
    uploadFileToSpaces,
} = require("../utils/uploadToCloud");

const Controller = new ControllerFactory(Category);

//TODO on any delete dec childCount

//TODO POPULATE MULTIPLE FIELDS
module.exports.getOne = Controller.getOne({
    required: ["name"],
    populate: ["groups"],
});

module.exports.deleteOne = Controller.deleteOne({
    required: ["name"],
});

module.exports.getAll = Controller.getAll({
    populate: ["groups"],
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
            ],
        },
    },
    (req, res, next, item) => {
        // Add req, res, next, and item as arguments
        uploadOneToSpaces("cover")(req, res, next, item); // Invoke uploadOneToSpaces function
    }
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