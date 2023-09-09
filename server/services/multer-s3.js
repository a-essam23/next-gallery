const multer = require("multer");
const multerS3 = require("multer-s3");
const { s3 } = require("./s3");

// Change bucket property to your Space name

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "elkhedewaya",
        acl: "public-read",
        key: function (request, file, cb) {
            const folderPath = "roman/development/"; // Specify the desired folder path
            cb(null, folderPath + file.originalname);
        },
    }),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB in bytes
    },
});

module.exports = { upload };
