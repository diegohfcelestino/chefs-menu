import { Router } from "express";
const router = Router();
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { create, findAll, findById } from "../controllers/menu.controller.js";

router.post("/", authMiddleware, create);
router.get("/", authMiddleware, findAll);

router.get("/:idRestaurant", authMiddleware, findById);

export default router;
