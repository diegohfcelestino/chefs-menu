import { Router } from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import userController from "../controllers/user.controller.js"
import { validId, validUser } from "../middlewares/global.middlewares.js"

const router = Router()

router.post("/", userController.create)
router.get("/", userController.findAll)
router.get("/:id", validId, validUser, userController.findById)
router.patch("/:id", authMiddleware, validId, validUser, userController.update)

export default router
