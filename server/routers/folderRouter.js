const express = require("express");
const router = express.Router();
const foldersControllers = require("./../controllers/foldersControllers");
const multerConfig = require("../config/multerConfig");
const { restrictTo, isAuthMiddleware } = require("../middlewares/auth");

// router.route("/").get(foldersControllers.getAllFolders);
// router.route("/search").get(foldersControllers.searchAllfolders);
router.use(isAuthMiddleware);
router
  .route("/upload")
  .post(multerConfig.imageUpload.any(), foldersControllers.createFolder);

router
  .route("/:code")
  .get(foldersControllers.getOneFolder)
  .patch(restrictTo("admin", "data-entry"), foldersControllers.updateOneFolder)
  .delete(
    restrictTo("admin", "data-entry"),
    foldersControllers.deleteManyFolders
  );

module.exports = router;
