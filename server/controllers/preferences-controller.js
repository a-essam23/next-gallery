const { ControllerFactory } = require("../utils/ControllerFactory");
const GenericPreferences = require("../models/Preferences");
const AppError = require("../utils/appError");
const { uploadFileToSpaces } = require("../utils/uploadToCloud");
const { caches } = require("../cache/preference");

const Controller = new ControllerFactory(GenericPreferences);

module.exports.updateAppearance = Controller.updateOne(
    {
        query: {
            required: ["name"],
        },
        body: {
            optional: [
                {
                    parent: "options",
                    name: "cover",
                    parse: async (file) => {
                        if (!file?.originalname || !file?.size)
                            throw new AppError(
                                400,
                                "No image attached to request"
                            );
                        const filePath = await uploadFileToSpaces(
                            file,
                            "preference/appearance"
                        );
                        return filePath;
                    },
                },
                { name: "mainTitle", parent: "options" },
                { name: "subTitle", parent: "options" },
                { name: "theme", parent: "options" },
                { name: "logoSubtitle", parent: "options" },
                { name: "exploreSubtitle", parent: "options" },
            ],
        },
    },
    (req, res, next, item) => {
        Object.assign(caches["appearance"], item.toObject());
        console.log(caches["appearance"]);
    }
);

module.exports.updateDetails = Controller.updateOne(
    {
        query: {
            required: ["name"],
        },
        body: {
            optional: [
                { parent: "options", name: "phoneNumbers" },
                { parent: "options", name: "addresses" },
                { parent: "options", name: "socials" },
                { parent: "options", name: "footerSignature" },
            ],
        },
    },
    (req, res, next, item) => {
        Object.assign(caches["details"], item.toObject());
        console.log(caches["details"]);
    }
);

module.exports.getOne = (req, res, next) => {
    const query = req.query;
    if (!query.name)
        return next(new AppError(400, "name is missing from request"));
    const cache = caches[query.name];
    if (!cache) return next(new AppError(404));
    res.status(200).send({ data: cache });
};