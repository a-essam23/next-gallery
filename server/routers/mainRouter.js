const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const adminController = require("../controllers/adminController");
const { restrictTo } = require("../middlewares/auth");

router
  .route("/")
  .get(mainController.getMainPage)
  .post(
    adminController.protect,
    restrictTo("admin", "data-entry"),
    mainController.createMainPage
  );

router
  .route("/:id")
  .get(mainController.getOneMain)
  .patch(
    adminController.protect,
    restrictTo("admin", "data-entry"),
    mainController.updateMain
  )
  .delete(
    adminController.protect,
    restrictTo("admin", "data-entry"),
    mainController.deleteMainPage
  );

module.exports = router;
