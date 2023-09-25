import {
    getAllImage,
    getOneImage,
    postOneImage,
} from "@controllers/image-controller";
import { protect } from "@middlewares";
import { Router } from "express";

const router = Router();
router.get("/", getOneImage);
router.post("/", protect("editor"), postOneImage);
router.get("/all", getAllImage);

export default router;
