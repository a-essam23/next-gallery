const express = require("express");
const router = express.Router({ mergeParams: true });
const imagesControllers = require("./../controllers/imagesControllers");
const adminController = require("./../controllers/adminController");

const multerConfig = require("../config/multerConfig");
router.use(adminController.protect);
router.route("/").get(imagesControllers.getAllImages);
// router.route("/search").get(imagesControllers.searchAllImages);

router.route("/upload").post(
  multerConfig.imageUpload.any(),
  // imagesControllers.setUserIds,
  imagesControllers.createImage
);

router
  .route("/:code")
  .get(imagesControllers.getOneImage)
  .patch(
    adminController.protect,
    adminController.restrictTo("admin", "data-entry"),

    imagesControllers.updateImage
  )
  .delete(
    adminController.protect,
    adminController.restrictTo("admin", "data-entry"),
    imagesControllers.deleteImages
  );

module.exports = router;
