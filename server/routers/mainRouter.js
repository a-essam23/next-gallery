const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const { restrictTo, protect } = require("../middlewares/auth");

router.use(protect);

router
    .route("/")
    .get(mainController.getMainPage)
    .post(restrictTo("admin", "data-entry"), mainController.createMainPage);

router
    .route("/:code")
    .get(mainController.getOneMain)
    .patch(restrictTo("admin", "data-entry"), mainController.updateMain)
    .delete(restrictTo("admin", "data-entry"), mainController.deleteMainPage);

module.exports = router;
