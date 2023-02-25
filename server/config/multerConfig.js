const multer = require("multer"),
  path = require("path");

//multer.diskStorage() creates a storage space for storing files.
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      const filePath = path.join(
        path.dirname(require.main.filename) + "/files"
      );
      console.log(path.join(__dirname, "../files"));
      // console.log(filePath);
      cb(null, filePath);
    } else {
      cb({ message: "This file is not an image file, multer Error" }, false);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};
const upload = multer({
  storage: imageStorage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter,
});
// const videoStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     if (file.mimetype === "video/mp4") {
//       cb(null, path.join(__dirname, "../files"));
//     } else {
//       cb({ message: "This file is not in video format,multer error" }, false);
//     }
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
module.exports = {
  unitUpload: multer({ storage: imageStorage }),
  // videoUpload: multer({ storage: videoStorage }),
  upload,
};
