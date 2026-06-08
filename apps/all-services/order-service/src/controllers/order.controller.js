import axios from "axios";
import Order from "../models/order.model.js";
import orderModel from "../models/order.model.js";
import { publishToQueue } from '../broker/broker.js';

export const createOrder = async (req, res) => {
    try {
        const user = req.user;

        const token =
            req.cookies?.token ||
            req.headers?.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const cartItems = (
            await axios.get(
                "http://localhost:3002/api/carts/get",
                {
                    headers: {
                        Authorization: `Bearer ${token} `
                    }
                }
            )
        ).data.cart.items;

        if (!cartItems.length) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        const products = (
            await Promise.all(
                cartItems.map((item) =>
                    axios.get(
                        `http://localhost:3001/api/products/${item.productId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    )
                )
            )
        ).map((response) => response.data.data);

        let totalAmount = 0;

        const orderItems = cartItems.map((cartItem, index) => {
            const product = products[index];

            if (product.stock < cartItem.quantity) {
                throw new Error(
                    `${product.title} is out of stock`
                );
            }

            const itemTotal =
                product.price.amount * cartItem.quantity;

            totalAmount += itemTotal;

            return {
                product: cartItem.productId,
                quantity: cartItem.quantity,
                price: {
                    amount: itemTotal,
                    currency: product.price.currency
                }
            };
        });

        const order = await orderModel.create({
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

        await publishToQueue('ORDER_SELLER_DASHBOARD.ORDER_CREATED', order);
        await axios.delete(
            "http://localhost:3002/api/carts/clear",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return res.status(201).json({
            success: true,
            order
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getMyOrder = async (req, res) => {
    try {

        const userId = req.user.id;

        try {

            const order = await orderModel.findOne({ user: userId });

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: `Order not found `
                });
            };

            return res.status(200).json({
                success: true,
                message: `order fetched successfully`,
                orderData: order
            });

        } catch (error) {
            res.status(401).json({
                success: false,
                message: `faild to fetch myOrder ${error}`
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error ${error}`
        })
    }
};


export const getOrderById = async (req, res) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;

        try {

            const order = await orderModel.findById(orderId);

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: `Order not found ${error}`
                });
            };

            return res.status(200).json({
                success: true,
                message: `order fetched successfully`,
                orderData: order
            });


        } catch (error) {
            res.status(404).json({
                success: false,
                message: 'Order not found', error
            });
        };

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error ${error}`
        })
    }
};


export const cancelOrderById = async (req, res) => {
    try {

        const orderId = req.params.id;
        const userId = req.user.id;

        try {

            const order = await orderModel.findOne({ user: userId });

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: `Order not found`
                });
            };

            if (!order.user.toString() == userId) {
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden : you can cancel your order only'
                });
            };


            if (order.status.toString() !== 'PENDING') {
                return res.status(403).json({
                    success: false,
                    message: `Order Status is : ${order.status.toString()} , So order can't be cancelled at this stage`
                });
            };


            order.status = 'CANCELLED';
            order.save();


            return res.status(200).json({
                success: true,
                message: `Order Cancelled !`
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `faild to cancel order`
            });
        };

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error ${error}`
        });
    };
};


export const updateShippingAddress = async (req, res) => {
    const user = req.user;
    const orderId = req.params.id;

    try {
        const order = await orderModel.findById(orderId)

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.user.toString() !== user.id) {
            return res.status(403).json({ message: "Forbidden: You do not have access to this order" });
        }

        // only PENDING orders can have address updated
        if (order.status !== "PENDING") {
            return res.status(409).json({ message: "Order address cannot be updated at this stage" });
        }

        order.shippingAddress = {
            street: req.body.shippingAddress.street,
            city: req.body.shippingAddress.city,
            state: req.body.shippingAddress.state,
            zip: req.body.shippingAddress.pincode,
            country: req.body.shippingAddress.country,
        };

        await order.save();

        res.status(200).json({ order });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
