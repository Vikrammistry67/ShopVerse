import mongoose from 'mongoose';
import cartModel from '../models/cart.model.js';


export async function addtoCart(req, res) {
    try {
        const { productId, qty } = req.body;

        const user = req.user

        let cart = await cartModel.findOne({ user: user.id });

        if (!cart) {
            cart = new cartModel({ user: user.id, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += qty;
        } else {
            cart.items.push({ productId, quantity: qty });
        }

        await cart.save();

        res.status(200).json({
            message: 'Item added to cart',
            cart,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'failed to add to cart',
            error: error.message || error
        });
    };
};


export async function getCart(req, res) {
    try {
        const userId = req.user.id;
        let cart = await cartModel.findOne({ user: userId });

        if (!cart || cart.items.length === 0) {
            cart = new cartModel({ user: userId, items: [] });
            await cart.save();
            return res.status(404).json({
                success: false,
                message: 'Cart is Empty'
            });
        }


        return res.status(200).json({
            success: true,
            cart,
            totals: {
                itemCount: cart.items.length,
                totalQuantity: cart.items.reduce((total, item) => total + item.quantity, 0)
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'failed to get cart',
            error: error.message || error
        });
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
        return res.status(500).json({
            success: false,
            message: 'failed to remove from cart',
            error: error.message || error
        });
    };
};


export async function getcartById(req, res) {
    try {
        const cartId = req.params.id;
        const { productId, qty } = req.body;
        const cart = await cartModel.findById(cartId);

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
        return res.status(500).json({
            success: false,
            message: 'failed to get cart by id',
            error: error.message || error
        });
    };
}


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
        return res.status(500).json({
            success: false,
            message: 'failed to clear cart',
            error: error.message || error
        });
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
        return res.status(500).json({
            success: false,
            message: 'failed to update cart item',
            error: error.message || error
        });
    }
};




// for practice --->
// export const addItemToCart = async (req, res, next) => {
//     try {
//         const userId = req.user.id;
//         const { productId, qty } = req.body;

//         const cart = await cartModel.findOne({ user: userId });


//         if (!cart) {
//             cart = new cartModel({ user: userId, items: [] });
//         };


//         const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

//         if (existingItemIndex >= 0) {
//             cart.items[existingItemIndex].quantity += qty;
//         } else {
//             carts.items.push({ productId, quantity: qty });
//         }

//         await cart.save();

//         res.status(200).json({
//             message: 'Item added to cart',
//             cart,
//         });
//     } catch (error) {
//         new Error('failed to add item to cart');
//     };
// };






// export const getCarts = async (req, res) => {
//     try {
//         const userId = req.user.id;

//         const cart = await cartModel.findOne({ user: userId });

//         if (!cart || cart.items.length == 0) {
//             return res.json({
//                 messsge: 'Cart is empty'
//             });
//         };

//         return res.json({
//             message: 'Cart fetched successfully',
//             cart
//         })

//     } catch (error) {
//         new Error('failed to fetch items');
//     }
// }


// export const updateCart = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const { productId, qty } = req.body;

//         // find cart of user;
//         const cart = await cartModel.findOne({ user: userId });

//         const existingItemIndex = cart.items.findIndex(item => cart.productId.toString() == productId);

//         if (existingItemIndex == -1) console.log('item not found in this cart');

//         cart.items[existingItemIndex].quantity += qty;

//         await cart.save();
//         return res.json({
//             message: ' cart updated'
//         })
//     } catch (error) {
//         console.log('failed')
//     }
// };














// export const addItem = async (req, res) => {
//     try {
//         const { productId, qty } = req.body;

//         const userId = req.user.id;

//         // check user cart is empty or not --->
//         const cart = await cartModel.findOne({ user: userId });

//         if (!cart) {
//             cart = new cartModel({ user: userId, items: [] });
//         };


//         const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

//         if (existingItemIndex >= 0) {
//             cart.items[existingItemIndex].quantity += qty;
//         } else {
//             cart.items.push({ productId, quantity: qty })
//         };


//         await cart.save();

//         return res.json({
//             success: true,
//             message: 'added to cart successfully',
//             cart
//         });


//     } catch (error) {
//         new Error('failed to add item to cart !')
//     }
// };





















