import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({}, { timestamps: true });


const cartModel = mongoose.model('cart', cartSchema);

export default cartModel;