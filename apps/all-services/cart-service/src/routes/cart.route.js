import express from 'express';
import { addtoCart, clearCart, getCart, getcartById, removeFromCart, updateCartItem } from '../controllers/cart.controller.js';
import { createAuthMiddleware } from '../middlewares/auth.middleware.js';
const Router = express.Router();

Router.post('/add', createAuthMiddleware(['user']), addtoCart);
Router.get('/', createAuthMiddleware(['user']), getCart);
Router.delete('/remove', createAuthMiddleware(['user']), removeFromCart);
Router.delete('/clear', createAuthMiddleware(['user']), clearCart);
Router.put('/update', createAuthMiddleware(['user']), updateCartItem);

Router.get('/:id', createAuthMiddleware(['user']), getcartById);

Router.get('/health', createAuthMiddleware(['user']), (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Cart service auth middleware is working fine',
        user: req.user
    });
});

export default Router;