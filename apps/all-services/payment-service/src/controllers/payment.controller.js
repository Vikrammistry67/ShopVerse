import paymentModel from "../models/payment.model.js";
import axios from 'axios';
import Razorpay from 'razorpay'
import _config from "../config/config.js";
import { publishToQueue } from '../broker/broker.js';
import { validatePaymentVerification } from '../../node_modules/razorpay/dist/utils/razorpay-utils.js';


// razorPay - setup -->
const _razorpay = new Razorpay({
    key_id: _config.RAZORPAY_KEY_ID,
    key_secret: _config.RAZORPAY_SECRET_ID
});



export const createPayment = async (req, res) => {

    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
    const orderId = req.params.id;
    const userId = req.user.id;

    const option = {
        amount: 5000 * 100,
        currency: 'INR'
    };

    try {
        const orderResponse = await axios.get('http://localhost:3003/api/orders/' + orderId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });


        const priceAmount = orderResponse.data.orderData.totalPrice; // { amount: 850000, currency: 'INR' }
        const order = await _razorpay.orders.create(priceAmount); // order details

        const payment = await paymentModel.create({
            order: orderId,
            razorpayOrderId: order.id,
            user: userId,

            price: {
                amount: order.amount,
                currency: order.currency
            },
        });

        await publishToQueue('PAYMENT_NOTIFICATION.PAYMENT_INITIATED', {
            email: req.user.email,
            orderId: orderId,
            amount: payment.price.amount / 100,
            currency: payment.price.currency,
            username: req.user.username,

        });
        await publishToQueue('PAYMENT_SELLER_DASHBOARD.PAYMENT_CREATED', payment);
        console.log('payment : ', payment);

        return res.status(201).json({
            success: true,
            message: 'Payment Initiated Successfully',
            paymentData: payment
        });

    } catch (error) {
        console.log(`ERROR : ${error}`)
        res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    };
};


export const verifyPayment = async (req, res) => {
    const { razorpayOrderId, paymentId, signature } = req.body;
    try {
        const isValid = validatePaymentVerification({
            order_id: razorpayOrderId,
            payment_id: paymentId
        },
            signature, _config.RAZORPAY_SECRET_ID);


        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Signature'
            });
        };


        const payment = await paymentModel.findOne({ razorpayOrderId, status: "PENDING" });

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'payment not found'
            });
        };

        payment.razorpayPaymentId = paymentId;
        payment.signature = signature;
        payment.status = "COMPLETED";


        await payment.save();

        await publishToQueue("PAYMENT_NOTIFICATION.PAYMENT_COMPLETED",
            {
                email: req.user.email,
                orderId: payment.order,
                paymentId: payment.paymentId,
                amount: payment.price.amount / 100,
                currency: payment.price.currency,
                fullName: req.user.fullName
            }
        )
        await axios.put('http://localhost:3003/api/orders/' + payment.order, {
            status: 'COMPLETED'
        });

        return res.status(201).json({
            success: true,
            message: 'Payment verified successfully',
            paymentDetails: payment
        });

    } catch (error) {
        await publishToQueue("PAYMENT_NOTIFICATION.PAYMENT_FAILED",
            {
                email: req.user.email,
                paymentId: paymentId,
                orderId: razorpayOrderId,
                fullName: req.user.fullName
            }
        )
        console.log(`ERROR : ${error}`)
        res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    };
};
