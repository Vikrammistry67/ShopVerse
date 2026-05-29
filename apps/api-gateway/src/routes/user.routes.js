import express from "express";
import { SERVICES } from "../config/services.config.js";
import { createProxy } from "../services/proxy.service.js";
import { userLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.use("/cart", userLimiter, createProxy(SERVICES.CART, "/api/cart"));
router.use("/order", userLimiter, createProxy(SERVICES.ORDER, "/api/order"));
router.use("/notification", userLimiter, createProxy(SERVICES.NOTIFICATION, "/api/notification"));
router.use("/seller-dashboard", userLimiter, createProxy(SERVICES.SELLER, "/api/seller"));

export default router;