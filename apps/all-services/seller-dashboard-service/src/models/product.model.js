import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true // 🔥 for search/filter
    },
    description: {
        type: String,
    },
    price: {
        amount: {
            type: Number,
            required: true,
            index: true // 🔥 for sorting/filtering
        },
        currency: {
            type: String,
            enum: ['USD', 'INR'],
            default: 'INR'
        }
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    images: [
        {
            url: String,
            thumbnail: String,
            id: String
        }
    ],
    stock: {
        type: Number,
        default: 0,
        index: true
    }
}, { timestamps: true });


productSchema.index({ title: "text", description: "text" });

productSchema.index({ "price.amount": 1, stock: 1 });

productSchema.index({ seller: 1, stock: 1 });

export default mongoose.model("Product", productSchema);