const express = require("express");
const router = express.Router();
const productsControllers = require("../../controllers/productsControllers");
const multerConfig = require("../../config/multerConfig");
const { restrictTo, protect } = require("../../middlewares/auth");
const { validation } = require("../../middlewares/validation");
const validators = require("./productValidation");

router.use(protect);

router
  .route("/upload")
  .post(
    multerConfig.unitUpload.any(),
    validation(validators.createProductValidation),
    productsControllers.createProduct
  );

router
  .route("/:code")
  .get(
    validation(validators.getOneProductValidation),
    productsControllers.getOneProduct
  )
  .patch(
    validation(validators.updateOneProductValidation),
    productsControllers.updateOneProduct
  )
  .delete(
    validation(validators.deleteProductValidation),
    // restrictTo("admin", "data-entry"),
    productsControllers.deleteManyProducts
  );
router
  .route("/hide/:code")
  .patch(
    validation(validators.hideProductValidation),
    productsControllers.hideProducts
  );
module.exports = router;
