const express = require("express");
const router = express.Router();
const groupsControllers = require("../controllers/groupsControllers");
const adminController = require("./../controllers/adminController");

const multerConfig = require("../config/multerConfig");
const { restrictTo, isAuthMiddleware } = require("../middlewares/auth");

// router.route("/").get(groupControllers.getAllgroup);
// router.route("/search").get(groupControllers.searchAllgroup);

router.use(isAuthMiddleware);
router
  .route("/upload")
  .post(multerConfig.imageUpload.any(), groupsControllers.createGroup);

router
  .route("/:code")
  .get(groupsControllers.getOneGroup)
  .patch(restrictTo("admin", "data-entry"), groupsControllers.updateGroup)
  .delete(
    restrictTo("admin", "data-entry"),
    groupsControllers.deleteManyGroups
  );

module.exports = router;
