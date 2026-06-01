import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { SERVICES } from "../../config/services.config.js";

const router = express.Router();

router.use(
    "/",
    createProxyMiddleware({
        target: SERVICES.AUTH, 
        changeOrigin: true,

        pathRewrite: (path, req) => {
            console.log("👉 Incoming:", path);

            const newPath = "/api/auth" + path;

            console.log("👉 Rewritten:", newPath);

            return newPath;
        }
    })
);

export default router;