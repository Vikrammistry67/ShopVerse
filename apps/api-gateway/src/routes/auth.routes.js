import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import rateLimit from "express-rate-limit";

const router = express.Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5
});

router.use(
    "/",
    authLimiter,
    createProxyMiddleware({
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
            "^/": "/"
        }
    })
);

export default router;