import mongoose from "mongoose";
import _config from '../config/config.js'


const connectToCartDb = async () => {
    try {
        await mongoose.connect(_config.MONGO_URI);
        console.log(`Cart database connected successfully`);
    } catch (error) {
        new Error(`failed to connect Cart DB : ${error}`)
    }
};


export default connectToCartDb;