const express = require("express");
const router = express.Router();
const imagesControllers = require("../../controllers/imagesControllers");
const multerConfig = require("../../config/multerConfig");
const {
  restrictTo,
  isAuthMiddleware,
  protect,
} = require("../../middlewares/auth");
const { resizeImage } = require("../../middlewares/resizeImage");
const commentRouter = require("../comment/commentRouter");
const { validation } = require("../../middlewares/validation");
const validators = require("./imageValidation");

// api/v1/image/:code/comments
router.use("/:code/comments", commentRouter);
router.use(protect);

router.route("/").get(imagesControllers.getAllImages);
// router.route("/search").get(imagesControllers.searchAllImages);

router.route("/upload").post(
  multerConfig.imageUpload.any(),
  // imagesControllers.setUserIds,
  // resizeImage(100, 100),
  imagesControllers.createImage
);

router
  .route("/:code")
  .get(
    validation(validators.getOneImageValidation),
    imagesControllers.getOneImage
  )
  .patch(
    validation(validators.updateImageValidation),
    imagesControllers.updateImage
  )
  .delete(
    validation(validators.deleteImageValidation),
    imagesControllers.deleteImages
  );

module.exports = router;
