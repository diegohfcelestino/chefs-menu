import express from "express";
import connectDataBase from "./src/database/db.js";
import dotenv from "dotenv";
import cors from "cors";

import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import restaurantRoute from "./src/routes/restaurant.route.js";
import menuRoute from "./src/routes/menu.route.js";
import swaggerRoute from "./src/routes/swagger.route.cjs";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
connectDataBase();
app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/restaurant", restaurantRoute);
app.use("/menu", menuRoute);
app.use("/documentation", swaggerRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
