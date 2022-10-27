const express = require("express");
const router = express.Router({ mergeParams: true });
const imagesControllers = require("../../controllers/imagesControllers");
const multerConfig = require("../../config/multerConfig");
const { restrictTo, isAuthMiddleware } = require("../../middlewares/auth");
const { resizeImage } = require("../../middlewares/resizeImage");
const commentRouter = require("../comment/commentRouter");

// router.use(isAuthMiddleware);
router.use("/:code/comments", commentRouter);
router.route("/").get(imagesControllers.getAllImages);
// router.route("/search").get(imagesControllers.searchAllImages);

router.route("/upload").post(
  multerConfig.imageUpload.any(),
  // imagesControllers.setUserIds,
  resizeImage(100, 100),
  imagesControllers.createImage
);

router
  .route("/:code")
  .get(imagesControllers.getOneImage)
  .patch(restrictTo("admin", "data-entry"), imagesControllers.updateImage)
  .delete(restrictTo("admin", "data-entry"), imagesControllers.deleteImages);

module.exports = router;
