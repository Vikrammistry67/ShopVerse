import express from 'express';
import { createAuthMiddleware } from '../middlewares/auth.middleware.js';
import { cancelOrderById, createOrder, getMyOrder, getOrderById, updateShippingAddress } from '../controllers/order.controller.js';
import { createOrderValidation } from '../validator/order.validation.js';
const Router = express.Router();


// Routes --> 
Router.post('/create', createAuthMiddleware(['user']), createOrderValidation, createOrder);


// get My Order -->
Router.get('/me', createAuthMiddleware(['user']), getMyOrder);


// get order by ID --> 
Router.get('/:id', createAuthMiddleware(['user']), getOrderById);


// calncel order by ID -->
Router.post('/:id/cancel', createAuthMiddleware(['user']), cancelOrderById);



// update Shipping Addredd -->
Router.patch("/:id/address", createAuthMiddleware(['user']), updateShippingAddress);


export default Router;