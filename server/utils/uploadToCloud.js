const fs = require("fs");
const { s3UploadOne } = require("../services/s3");
const AppError = require("./appError");

module.exports.uploadFileToSpaces = async (file, spacesPath) => {
    console.log("UPLOADING FILE TO SPACES", file, spacesPath);
    if (!file) throw new AppError(400, "No file attached to uploadFile");
    const uploadedFile = await s3UploadOne(
        file.path,
        spacesPath ? `${spacesPath}/${file.originalname}` : file.originalname
    );
    if (file) {
        fs.unlink(file.path, (err) => err && console.log(err));
    }
    return `${process.env.SPACES_CDN}/${uploadedFile.Key}`;
};


module.exports.uploadOneToSpaces = (name, parents) => {
    return async (req, res, next, doc) => {
        const cover = req.body[name];
        if (!doc) return;
        if (cover) {
            let spacesFolderPath = doc._id;
            if (parents) {
                for (const parent of parents) {
                    spacesFolderPath = `${doc[parent]}/${spacesFolderPath}`;
                }
            }
            doc.cover.filename = cover.originalname;
            doc.cover.path = spacesFolderPath;
            let uploadedFile = await s3UploadOne(
                cover.path,
                `${spacesFolderPath}/${cover.originalname}`,
                cover.mimetype
            );
            doc.cover.url = `${process.env.SPACES_CDN}/${uploadedFile.Key}`;
            console.log("uploaded to spaces", uploadedFile);
            if (req?.file) {
                fs.unlink(req.file.path, (err) => err && console.log(err));
            }
            await doc.save();
        }
        return;
    };
};
