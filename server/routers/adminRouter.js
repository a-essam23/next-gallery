const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
router.route("/signup").post(adminController.signup);
router.route("/login").post(adminController.login);
router.get("/users", adminController.getAllUsers);
module.exports = router;
