import express from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import aiRoutes from "./routes/ai.routes.js";
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api", userRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/ai", aiRoutes);

export default app;