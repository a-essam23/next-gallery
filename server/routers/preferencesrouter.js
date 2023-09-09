const express = require("express");
const router = new express.Router();
const {
    updateAppearance,
    updateDetails,
    getOne,
} = require("../controllers/preferences-controller");
const { uploadOne } = require("../utils/multer");
const protect = require("../middleware/protect");

router.put(
    "/appearance",
    protect.admin,
    uploadOne("cover", false),
    updateAppearance
);

router.put("/details", protect.admin, uploadOne("cover", false), updateDetails);

router.get("/", getOne);

module.exports = router;
