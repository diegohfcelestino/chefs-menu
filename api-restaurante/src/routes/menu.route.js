import { Router } from "express";
const router = Router();
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { create, findAll, findByIdRestaurant, findById, searchByText, erase } from "../controllers/menu.controller.js";

router.post("/", authMiddleware, create);
router.get("/", authMiddleware, findAll);
router.get("/search", searchByText);
router.get("/idRestaurant/:idRestaurant", authMiddleware, findByIdRestaurant);
router.get("/:id", authMiddleware, findById);
router.delete("/:id", authMiddleware, erase);

export default router;
