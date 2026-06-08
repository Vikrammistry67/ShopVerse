import express from 'express';
import { createAuthMiddleware } from '../middlewares/auth.middleware.js';
import { getMetrics, getOrders, getProducts } from '../controllers/sellerdashboard.controller.js';
const Router = express.Router();

// Routes -->
Router.get('/matrix', createAuthMiddleware(['seller']), getMetrics);

Router.get("/orders", createAuthMiddleware(["seller"], getOrders))

Router.get("/products", createAuthMiddleware(["seller"], getProducts))


export default Router;