import express from "express";
import { SERVICES } from "../../config/services.config.js";
import { createProxy } from "../../services/proxy.service.js";
import { aiLimiter } from "../../middlewares/rateLimiter.js";

const router = express.Router();

router.use("/", aiLimiter, createProxy(SERVICES.AI, "/api/ai"));

export default router;