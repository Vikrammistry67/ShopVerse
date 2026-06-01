import cartModel from '../models/cart.model.js';


export async function addtoCart(req, res) {
    try {
        const userId = req.user.id;
    } catch (error) {
        new Error(`failed to add to cart : ${error}`);
    };
};