const express = require("express");
const router = express.Router();
const categorysControllers = require("../../controllers/categorysControllers");
const usersController = require("../../controllers/usersController");

const multerConfig = require("../../config/multerConfig");
const { validation } = require("../../middlewares/validation");
const validators = require("./categoryValidation");
const { protect } = require("../../middlewares/auth");

// router.route("/").get(categoryControllers.getAllcategory);
// router.route("/search").get(categoryControllers.searchAllcategory);

router.use(protect);

router
  .route("/upload")
  .post(
    multerConfig.unitUpload.any(),
    validation(validators.createCategoryValidation),
    categorysControllers.createCategory
  );

router
  .route("/:code")
  .get(
    validation(validators.getOneCategoryValidation),
    categorysControllers.getOneCategory
  )
  .patch(
    validation(validators.updateCategoryValidation),
    categorysControllers.updateCategory
  )
  .delete(
    // restrictTo("admin", "data-entry"),
    validation(validators.deleteCategoryValidation),
    categorysControllers.deleteManyCategorys
  );

router
  .route("/hide/:code")
  .patch(
    validation(validators.hideCategorysValidation),
    categorysControllers.hideCategory
  );

module.exports = router;
