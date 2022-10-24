const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");
const { isAuthMiddleware, restrictTo } = require("../../middlewares/auth");

router.get(
  "/users",
  isAuthMiddleware,
  restrictTo("admin"),
  adminController.getAllUsers
);

router.get(
  "/users/:userId",
  isAuthMiddleware,
  restrictTo("admin"),
  adminController.getUser
);

router.patch(
  "/users/:userId",
  isAuthMiddleware,
  restrictTo("admin"),
  adminController.updateUser
);

router.patch(
  "/users/delete/:userId",
  isAuthMiddleware,
  restrictTo("admin"),
  adminController.deleteUser
);

module.exports = router;
