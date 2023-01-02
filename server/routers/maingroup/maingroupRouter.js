const express = require("express");
const router = express.Router();
const maingroupController = require("../../controllers/maingroupController");
const usersController = require("../../controllers/usersController");

const multerConfig = require("../../config/multerConfig");
// const { validation } = require("../../middlewares/validation");
// const validators = require("./groupValidation");
const { protect } = require("../../middlewares/auth");

router.use(protect);

router.route("/upload").post(
  multerConfig.imageUpload.any(),

  maingroupController.createMaingroup
);

router
  .route("/:code")
  .get(maingroupController.getOneMaingroup)
  // .patch(maingroupController.updateMaingroup)
  .delete(maingroupController.deleteManyMaingroups);

// router.route("/hide/:code").patch(maingroupController.hideGroup);

module.exports = router;
