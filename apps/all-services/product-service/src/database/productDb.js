import mongoose from "mongoose";
import _config from "../config/config.js";


const connectToProductDb = async () => {
    try {
        await mongoose.connect(_config.JWT_SECRET);
        console.log(`product database connected successfully`)
    } catch (error) {
        new Error(`failed to connection product DB : ${error}`);
    }
};


export default connectToProductDb;