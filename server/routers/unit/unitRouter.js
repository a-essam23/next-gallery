const express = require("express");
const router = express.Router();
const unitsControllers = require("../../controllers/unitsControllers");
const multerConfig = require("../../config/multerConfig");
const { restrictTo, protect } = require("../../middlewares/auth");
const { resizeimage } = require("../../middlewares/resizeimage");
const commentRouter = require("../comment/commentRouter");
const { validation } = require("../../middlewares/validation");
const validators = require("./unitValidation");

// api/v1/unit/:code/comments

router.use(protect);

router.use("/:code/comments", commentRouter);

router.route("/").get(unitsControllers.getAllUnits);
// router.route("/search").get(unitsControllers.searchAllunits);

router.route("/upload").post(
  multerConfig.unitUpload.any(),
  // unitsControllers.setUserIds,
  // resizeunit(100, 100),
  unitsControllers.createUnit
);

router
  .route("/:code")
  .get(validation(validators.getOneUnitValidation), unitsControllers.getOneUnit)
  .patch(
    validation(validators.updateUnitValidation),
    unitsControllers.updateUnits
  )
  .delete(
    validation(validators.deleteUnitValidation),
    unitsControllers.deleteManyUnits
  );
router
  .route("/hide/:code")
  .patch(validation(validators.hideUnitValidation), unitsControllers.hideUnits);
module.exports = router;
