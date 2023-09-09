const express = require("express");
const router = new express.Router();
const {
    getAll,
    getOne,
    postOne,
    deleteOne,
    sample,
    updateOne,
} = require("../controllers/categorycontroller");
const { upload, uploadOne } = require("../utils/multer");
// const { upload } = require("../services/multer-s3");
const protect = require("../middleware/protect");
const { uploadOneToSpaces } = require("../utils/uploadToCloud");

router.get("/", getOne);
router.get("/all", getAll);
router.get("/sample", sample);
router.post("/", protect.admin, uploadOne("cover"), postOne);
router.delete("/", protect.admin, deleteOne);
router.put("/", protect.admin, uploadOne("cover", false), updateOne);

module.exports = router;
