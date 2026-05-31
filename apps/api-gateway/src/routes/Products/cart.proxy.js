import express from "express";
import { SERVICES } from "../../config/services.config.js";
import { createProxy } from "../../services/proxy.service.js";
import { productLimiter } from "../../middlewares/rateLimiter.js";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = express.Router();

router.use(
    "/",
    createProxyMiddleware({
        target: SERVICES.CART,
        changeOrigin: true,

        pathRewrite: (path, req) => {
            console.log(" Incoming:", path);
            const newPath = "/carts" + path;
            console.log(" Rewritten:", newPath);
            return newPath;
        }
    })
);

export default router;