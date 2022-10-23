const router = require("express").Router();

const passport = require("passport");

router.get("/facebook", passport.authenticate("facebook", {}));

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {}
);
router.get("/login");

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "",
    failureRedirect: "",
    failureFlash: true,
  })
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get("/google/redirect", (req, res) => {});

// router.route("/signup").post(adminController.signup);
router.route("/login").post(adminController.login);

module.exports = router;
