import axios from "axios";
import Order from "../models/order.model.js";


// controller - functions     --->
export const createOrder = async (req, res) => {
    try {
        const user = req.user;
        const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // ✅ 1. Fetch cart
        const cartResponse = await axios.get(
            "http://localhost:3002/api/carts",
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        const cartItems = cartResponse.data?.cart?.items;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Fetch products
        const products = await Promise.all(
            cartItems.map(async (item) => {
                const response = await axios.get(
                    `http://localhost:3001/api/products/${item.productId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                return response.data.data;
            })
        );

        let totalAmount = 0;

        // Build order items
        const orderItems = cartItems.map((item) => {

            const product = products.find(
                (p) => p._id.toString() === item.productId.toString()
            );

            if (!product) {
                throw new Error(`Product not found: ${item.productId}`);
            }

            if (product.stock < item.quantity) {
                throw new Error(`${product.title} out of stock`);
            }

            const itemTotal = product.price.amount * item.quantity;
            totalAmount += itemTotal;

            return {
                product: item.productId,
                quantity: item.quantity,   // ✅ correct
                price: {
                    amount: itemTotal,
                    currency: product.price.currency
                }
            };
        });

        // Create order
        const order = await Order.create({
            user: user.id,
            items: orderItems,
            totalPrice: {
                amount: totalAmount,
                currency: products[0]?.price.currency || "INR"
            },
            shippingAddress: {
                street: req.body.shippingAddress?.street,
                city: req.body.shippingAddress?.city,
                state: req.body.shippingAddress?.state,
                zip: req.body.shippingAddress?.pincode,
                country: req.body.shippingAddress?.country
            }
        });

        //  Clear cart (important)
        await axios.delete(
            "http://localhost:3002/api/carts/clear",
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        res.status(201).json({
            success: true,
            order
        });

    } catch (error) {
        console.error("❌ ERROR:", error.message);

        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};




