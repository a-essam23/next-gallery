const Jimp = require("jimp");
const path = require("path");

// exports.resizeImage = (width, height) => {
//   return (req, res, next) => {
//     const uploadFolder = path.join(__dirname, "../files");
//     console.log({ uploadFolder });
//     req.files.forEach((file) => {
//       const imageMimeType = file.mimetype.split("/")[1];
//       let smallImages = [];
//       Jimp.read(file)
//         .then((smallImage) => {
//           return (req.body.smallImages = smallImages.push(
//             smallImage
//               .resize(width, height)
//               .write(`${uploadFolder}/${file.filename}-small.${imageMimeType}`)
//           ));
//         })
//         .catch((err) => console.log(err));
//     });
//     next();
//   };
// };

exports.resizeImage = (width, height) => {
  return async (req, res, next) => {
    console.log(`${req.finalDestination}/${req.file.filename}`);
    console.log(req.file);
    const uploadFolder = path.join(__dirname, "../files");
    const imageMimetype = req.file.mimetype.split("/")[1];
    Jimp.read(req.file.path)
      .then((smallImage) => {
        return (req.body.smallImage = smallImage
          .resize(width, height)
          .write(
            `${uploadFolder}/${req.file.filename}-small.${imageMimetype}`
          ));
      })
      .catch((err) => console.log(err));
    next();
  };
};
