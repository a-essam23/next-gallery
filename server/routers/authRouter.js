const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/authController");

router.get("/login");

router.post(
  "/login",
  passport.authenticate(
    "local"
    // , {successRedirect: "",
    //   failureRedirect: "",
    //   failureFlash: true,}
  ),
  authController.login
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  authController.facebookLogin
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get("/google/redirect", authController.googleLogin);

router.get("/logout", authController.logout);

module.exports = router;
