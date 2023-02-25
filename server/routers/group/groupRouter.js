const express = require("express");
const router = express.Router();
const groupController = require("../../controllers/groupsController");
const usersController = require("../../controllers/usersController");

const multerConfig = require("../../config/multerConfig");
// const { validation } = require("../../middlewares/validation");
// const validators = require("./groupValidation");
const { protect } = require("../../middlewares/auth");

router.use(protect);

router.route("/upload").post(
  multerConfig.unitUpload.any(),

  groupController.createGroup
);

router
  .route("/:code")
  .get(groupController.getOneGroup)
  .patch(groupController.updateGroup)
  .delete(groupController.deleteManyGroups);

// router.route("/hide/:code").patch(groupController.hideGroup);

module.exports = router;
