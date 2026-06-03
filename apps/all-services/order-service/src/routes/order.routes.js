import express from 'express';
import { createAuthMiddleware } from '../middlewares/auth.middleware.js';
import { createOrder } from '../controllers/order.controller.js';
const Router = express.Router();


// Routes --> 
Router.post('/create', createAuthMiddleware(['user']), createOrder)

export default Router;