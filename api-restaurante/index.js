import express from "express";
import connectDataBase from "./src/database/db.js";
import dotenv from "dotenv";

import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import restaurantRoute from "./src/routes/restaurant.route.js";
import menuRoute from "./src/routes/menu.route.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
connectDataBase();
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/restaurant", restaurantRoute);
app.use("/menu", menuRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
