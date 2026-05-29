import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
    {
        size: String,
        color: String,
        price: Number,
        stock: Number,
        sku: String,
    },
    { _id: false }
);

const productSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        productName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },

        slug: {
            type: String,
            unique: true,
            index: true,
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            index: true,
        },

        images: [
            {
                url: String,
            },
        ],

        variants: [variantSchema],

        stock: {
            type: Number,
            default: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);



/** INDEXES */
productSchema.index({ productName: "text", description: "text" });
productSchema.index({ category: 1, price: 1 });



export default mongoose.model("Product", productSchema);