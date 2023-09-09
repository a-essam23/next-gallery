const express = require("express");
const router = new express.Router();
const {
    getAll,
    getOne,
    postOne,
    deleteOne,
    sample,
    updateOne,
} = require("../controllers/albumcontroller");
const { uploadOne } = require("../utils/multer");
const protect = require("../middleware/protect");
router.get("/", getOne);
router.get("/all", getAll);
router.post("/", protect.admin, uploadOne("cover"), postOne);
router.delete("/", protect.admin, deleteOne);
router.get("/sample", sample);
router.put("/", protect.admin, uploadOne("cover", false), updateOne);

module.exports = router;
