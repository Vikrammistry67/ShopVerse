import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { SERVICES } from '../../config/services.config.js';
const app = express();



app.use('/',
    createProxyMiddleware({
        target: SERVICES.ORDER,
        changeOrigin: true,
        pathRewrite: (path, res) => {
            console.log('INCOMING -> ', path);
            const newPath = '/orders' + path;
            console.log('RE-WRITTEN PATH', path)
        }
    })
);


export default app;