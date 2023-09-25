import {
    getAllNode,
    getOneNode,
    postOneNode,
} from "@controllers/node-controller";
import { protect } from "@middlewares";
import { Router } from "express";

const router = Router();
router.get("/", getOneNode);
router.post("/", protect("editor"), postOneNode);
router.get("/all", getAllNode);

export default router;
