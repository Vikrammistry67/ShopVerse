import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({

},
    { timestamps: true }
);

const model = mongoose.model('cart', cartSchema);
export default model;