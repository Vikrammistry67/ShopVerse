import express from 'express';
import { createPayment, verifyPayment } from '../controllers/payment.controller.js';
import { createAuthMiddleware } from '../middleware/auth.middleware.js';
const Router = express.Router();


Router.post('/create/:id', createAuthMiddleware(['user']), createPayment);

Router.post('/verify', createAuthMiddleware(['user']), verifyPayment);

export default Router;