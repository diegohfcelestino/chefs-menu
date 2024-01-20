import { Router } from "express"
const router = Router()
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { create, findAll } from "../controllers/menu.controller.js"

router.post("/", authMiddleware, create)
router.get("/", authMiddleware, findAll)

export default router
