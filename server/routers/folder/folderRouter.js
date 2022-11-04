const express = require("express");
const router = express.Router();
const foldersControllers = require("../../controllers/foldersControllers");
const multerConfig = require("../../config/multerConfig");
const { restrictTo, protect } = require("../../middlewares/auth");
const { validation } = require("../../middlewares/validation");
const validators = require("./folderValidation");

// router.route("/").get(foldersControllers.getAllFolders);
// router.route("/search").get(foldersControllers.searchAllfolders);

router.use(protect);

router
    .route("/upload")
    .post(
        multerConfig.imageUpload.any(),
        validation(validators.createFolderValidation),
        foldersControllers.createFolder
    );

router
    .route("/:code")
    .get(
        validation(validators.getOneFolderValidation),
        foldersControllers.getOneFolder
    )
    .patch(
        validation(validators.updateOneFolderValidation),
        foldersControllers.updateOneFolder
    )
    .delete(
        validation(validators.deleteFolderValidation),
        // restrictTo("admin", "data-entry"),
        foldersControllers.deleteManyFolders
    );
router
    .route("/hide/:code")
    .patch(
        validation(validators.hideFolderValidation),
        foldersControllers.hideFolders
    );
module.exports = router;
