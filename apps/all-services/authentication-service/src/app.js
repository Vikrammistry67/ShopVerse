import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// 🔥 Debug (OPTIONAL but useful)
app.use((req, res, next) => {
    console.log("🔥 AUTH SERVICE HIT:", req.method, req.url);
    next();
});

// ✅ IMPORTANT (FINAL ROUTE PREFIX)
app.use("/api/auth", authRoute);

export default app;