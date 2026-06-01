import mongoose from 'mongoose';
import cartModel from '../models/cart.model.js';


export async function addtoCart(req, res) {
    try {
        const userId = req.user.id;

        const { productId, qty } = req.body;

        const cart = await cartModel.findOne({ user: userId });

        if (!cart) {
            cart = new cartModel({ user: userId, items: [] });
            await cart.save();
        };

        const exitingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (exitingItemIndex >= 0) {
            cart.items[exitingItemIndex].quantity += qty;
        } else {
            cart.items.push({ productId, quantity: qty });
        };

        await cart.save();

        return res.status(201).json({
            success: true,
            message: 'Item added to cart successfuly',
            cart
        });

    } catch (error) {
        new Error(`failed to add to cart : ${error}`);
    };
};


export async function getCart(req, res) {
    try {
        const userId = req.user.id;
        const cart = await cartModel.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        return res.status(200).json({
            success: true,
            cart
        });
    } catch (error) {
        new Error(`failed to get cart : ${error}`);
    };
};

export async function removeFromCart(req, res) {
    try {
        const userId = req.user.id;
        const { productId } = req.body;
        const cart = await cartModel.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        };

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart'
            });
        };

        cart.items.splice(itemIndex, 1);
        await cart.save();
        return res.status(200).json({
            success: true,
            message: 'Item removed from cart successfuly',
            cart
        });
    } catch (error) {
        new Error(`failed to remove from cart : ${error}`);
    };
};

export async function clearCart(req, res) {
    try {
        const userId = req.user.id;
        const cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }
        cart.items = [];
        await cart.save();
        return res.status(200).json({
            success: true,
            message: 'Cart cleared successfuly',
            cart
        });
    }
    catch (error) {
        new Error(`failed to clear cart : ${error}`);
    }
};

export async function updateCartItem(req, res) {
    try {
        const userId = req.user.id;
        const { productId, qty } = req.body;
        const cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart'
            });
        }
        cart.items[itemIndex].quantity = qty;
        await cart.save();
        return res.status(200).json({
            success: true,
            message: 'Cart item updated successfuly',
            cart
        });
    } catch (error) {
        new Error(`failed to update cart item : ${error}`);
    }
};

