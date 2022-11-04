const express = require("express");
const router = express.Router();
const groupsControllers = require("../../controllers/groupsControllers");
const adminController = require("../../controllers/adminController");

const multerConfig = require("../../config/multerConfig");
const { validation } = require("../../middlewares/validation");
const validators = require("./groupValidation");
const { protect } = require("../../middlewares/auth");

// router.route("/").get(groupControllers.getAllgroup);
// router.route("/search").get(groupControllers.searchAllgroup);

router.use(protect);

router
    .route("/upload")
    .post(
        multerConfig.imageUpload.any(),
        validation(validators.createGroupValidation),
        groupsControllers.createGroup
    );

router
    .route("/:code")
    .get(
        validation(validators.getOneGroupValidation),
        groupsControllers.getOneGroup
    )
    .patch(
        validation(validators.updateGroupValidation),
        groupsControllers.updateGroup
    )
    .delete(
        // restrictTo("admin", "data-entry"),
        validation(validators.deleteGroupValidation),
        groupsControllers.deleteManyGroups
    );

router
    .route("/hide/:code")
    .patch(
        validation(validators.hideGroupsValidation),
        groupsControllers.hideGroup
    );

module.exports = router;
