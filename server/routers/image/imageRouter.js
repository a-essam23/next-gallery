const express = require("express");
const router = express.Router();
const imagesControllers = require("../../controllers/imagesControllers");
const multerConfig = require("../../config/multerConfig");
const { restrictTo, isAuthMiddleware } = require("../../middlewares/auth");
const { resizeImage } = require("../../middlewares/resizeImage");
const commentRouter = require("../comment/commentRouter");

// router.use(isAuthMiddleware);

// api/v1/image/:code/comments
router.use("/:code/comments", commentRouter);

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
  .get(imagesControllers.getOneImage)
  .patch(imagesControllers.updateImage)
  .delete(imagesControllers.deleteImages);

module.exports = router;
