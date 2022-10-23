const express = require("express");
const router = express.Router();
const foldersControllers = require("./../controllers/foldersControllers");
const adminController = require("./../controllers/adminController");
const multerConfig = require("../config/multerConfig");
const { restrictTo } = require("../middlewares/auth");

// router.route("/").get(foldersControllers.getAllFolders);
// router.route("/search").get(foldersControllers.searchAllfolders);
router.use(adminController.protect);
router
  .route("/upload")
  .post(multerConfig.imageUpload.any(), foldersControllers.createFolder);

router
  .route("/:code")
  .get(foldersControllers.getOneFolder)
  .patch(
    adminController.protect,
    restrictTo("admin", "data-entry"),
    foldersControllers.updateOneFolder
  )
  .delete(
    adminController.protect,
    restrictTo("admin", "data-entry"),
    foldersControllers.deleteManyFolders
  );

module.exports = router;
