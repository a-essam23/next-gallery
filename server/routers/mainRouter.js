const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const { restrictTo, isAuthMiddleware } = require("../middlewares/auth");

router.route("/").get(mainController.getMainPage).post(
  // isAuthMiddleware,
  restrictTo("admin", "data-entry"),
  mainController.createMainPage
);

router
  .route("/:id")
  .get(mainController.getOneMain)
  .patch(
    // isAuthMiddleware,
    restrictTo("admin", "data-entry"),
    mainController.updateMain
  )
  .delete(
    // isAuthMiddleware,
    restrictTo("admin", "data-entry"),
    mainController.deleteMainPage
  );

module.exports = router;
