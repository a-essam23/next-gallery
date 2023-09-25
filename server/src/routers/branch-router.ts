import {
    getAllBranches,
    getOneBranch,
    postOneBranch,
} from "@controllers/branch-controller";
import { protect } from "@middlewares";
import { Router } from "express";

const router = Router();

router.get("/", getOneBranch);
router.post("/", protect("editor"), postOneBranch);
router.get("/all", getAllBranches);
export default router;
