const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const adminController = require("../controllers/adminController");
router
  .route("/")
  .get(mainController.getMainPage)
  .post(
    adminController.protect,
    adminController.restrictTo("admin", "data-entry"),
    mainController.createMainPage
  );

router
  .route("/:id")
  .get(mainController.getOneMain)
  .patch(
    adminController.protect,
    adminController.restrictTo("admin", "data-entry"),

    mainController.updateMain
  )
  .delete(
    adminController.protect,
    adminController.restrictTo("admin", "data-entry"),
    mainController.deleteMainPage
  );

module.exports = router;
