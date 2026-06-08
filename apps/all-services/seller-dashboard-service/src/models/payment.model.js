import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
            index: true,
        },

        razorpayPaymentId: {
            type: String,
            trim: true,
            index: true,
        },

        razorpayOrderId: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            index: true,
        },

        signature: {
            type: String,
            trim: true,
        },

        status: {
            type: String,
            enum: ["PENDING", "COMPLETED", "FAILED"],
            default: "PENDING",
            index: true,
        },

        price: {

            amount: {
                type: Number,
                required: true
            },

            currency: {
                type: String,
                enum: ['INR', 'USD', 'DOLLAR'],
                default: 'INR',
                required: true
            }
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;