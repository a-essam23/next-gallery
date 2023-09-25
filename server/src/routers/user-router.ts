import { createOneUser, getOneUser } from "@controllers/user-controller";
import { protect } from "@middlewares";
import { Router } from "express";
const router = Router();

router.get("/", protect("user"), getOneUser);
router.post("/", createOneUser);
export default router;
