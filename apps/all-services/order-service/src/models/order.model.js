import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: "INR"
        }
    }
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: {
        type: [orderItemSchema],
        required: true
    },

    totalPrice: {
        amount: Number,
        currency: {
            type: String,
            default: "INR"
        }
    },

    status: {
        type: String,
        enum: ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED"],
        default: "PENDING"
    },

    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    }

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);