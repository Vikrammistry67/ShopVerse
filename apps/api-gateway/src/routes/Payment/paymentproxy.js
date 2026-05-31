import express from "express";
import { SERVICES } from "../../config/services.config.js";
import { createProxy } from "../../services/proxy.service.js";
import { paymentLimiter } from "../../middlewares/rateLimiter.js";

const router = express.Router();

router.use("/", paymentLimiter, createProxy(SERVICES.PAYMENT, "/api/payment"));

export default router;