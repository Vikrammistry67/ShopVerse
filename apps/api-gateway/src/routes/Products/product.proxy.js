import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";


const router = express.Router();

router.use(
    "/",
    createProxyMiddleware({
        target: "http://localhost:3001",
        changeOrigin: true,

        pathRewrite: (path, req) => {
            console.log(" Incoming:", path);
            const newPath = "/products" + path;
            console.log(" Rewritten:", newPath);
            return newPath;
        }
    })
);

export default router;