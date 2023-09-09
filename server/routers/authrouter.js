const express = require("express");
const router = new express.Router();
const { login, logout, register } = require("../controllers/authcontroller");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
