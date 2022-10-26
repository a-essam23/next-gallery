const Jimp = require("jimp");
const path = require("path");

exports.resizeImage = (width, height) => {
  return (req, res, next) => {
    const uploadFolder = path.join(__dirname, "../files");
    console.log(uploadFolder, "uploadFolder");
    req.files.forEach((file) => {
      const imageMimeType = file.mimetype.split("/")[1];
      let smallImages = [];
      Jimp.read(file)
        .then((smallImage) => {
          return (req.body.smallImages = smallImages.push(
            smallImage
              .resize(width, height)
              .write(`${uploadFolder}/${file.filename}-small.${imageMimeType}`)
          ));
        })
        .catch((err) => console.log(err));
    });
    next();
  };
};
