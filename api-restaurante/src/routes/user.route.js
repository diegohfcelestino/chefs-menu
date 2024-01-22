import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { create, findAll, findById, update } from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";

const router = Router();

router.post("/", create);
router.get("/", authMiddleware, findAll);
router.get("/:id", authMiddleware, validId, validUser, findById);
router.patch("/:id", authMiddleware, validId, validUser, update);

export default router;
