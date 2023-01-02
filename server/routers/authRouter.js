const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const path = require("path");

router.post(
  "/facebook/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    // failureFlash: true,}
  }),
  authController.login
);

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/failed",
  })
);
router.get("/profile", (req, res) => {
  console.log("you are a valid user");
});
router.get("/failed", (req, res) => {
  res.send("you failed");
});
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

router.post("/signup", authController.signup);

router.post("/login", authController.login);

module.exports = router;
