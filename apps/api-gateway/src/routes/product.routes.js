import express from "express";
import { SERVICES } from "../config/services.config.js";
import { createProxy } from "../services/proxy.service.js";
import { productLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.use("/", productLimiter, createProxy(SERVICES.PRODUCT, "/api/product"));

export default router;