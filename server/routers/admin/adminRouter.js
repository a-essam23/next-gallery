const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");
const { restrictTo, protect } = require("../../middlewares/auth");
const { validation } = require("../../middlewares/validation");
const validators = require("./adminValidation");

router.use(protect);

router.get("/users", restrictTo("admin"), adminController.getAllUsers);

router.get("/users/:userId", restrictTo("admin"), adminController.getUser);

router.patch(
    "/users/:userId",
    validation(validators.updateUserValidation),
    restrictTo("admin"),
    adminController.updateUser
);

router.patch(
    "/users/delete/:userId",
    restrictTo("admin"),
    adminController.deleteUser
);

module.exports = router;
