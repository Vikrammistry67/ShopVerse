import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.route.js";

const app = express();

app.use(express.json()); // ✅ ONLY HERE
app.use(cookieParser());
app.use(morgan("dev"));

// internal route
app.use("/auth", authRoute);

export default app;