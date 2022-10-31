const router = require("express").Router();
const passport = require("passport");
const authController = require("../../controllers/authController");
const path = require("path");
const { validation } = require("../../middlewares/validation");
const validators = require("./authValidation");

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//     // failureFlash: true,}
//   }),
//   authController.login
// );

// router.get("/facebook", passport.authenticate("facebook"));

// router.get(
//   "/facebook/redirect",
//   passport.authenticate("facebook"),
//   authController.facebookLogin
// );

// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile"],
//   })
// );

// router.get("/google/redirect", authController.googleLogin);

// router.get("/logout", authController.logout);

router.post(
  "/signup",
  validation(validators.signupValidation),
  authController.signup
);

router.post(
  "/login",
  validation(validators.loginValidation),
  authController.login
);

module.exports = router;
