import {
    getAllFolder,
    getOneFolder,
    postOneFolder,
} from "@controllers/folder-controller";
import { protect } from "@middlewares";
import { Router } from "express";

const router = Router();

router.get("/", getOneFolder);
router.post("/", protect("editor"), postOneFolder);
router.get("/all", getAllFolder);
export default router;
