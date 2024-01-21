import { Router } from "express";
import userRoute from "./user.route.js";
import authRoute from "./auth.route.js";
import restaurantRoute from "./restaurant.route.js";
import menuRoute from "./menu.route.js";
import swaggerRoute from "./swagger.route.cjs";

const router = Router();

router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/restaurant", restaurantRoute);
router.use("/menu", menuRoute);
router.use("/documentation", swaggerRoute);

export default router;