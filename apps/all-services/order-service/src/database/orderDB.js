import mongoose from "mongoose";
import _config from '../config/config.js'


const connectToOrderDb = async () => {
    try {
        await mongoose.connect(_config.MONGO_URI);
        console.log(`Order database connected successfully`);
    } catch (error) {
        new Error(`failed to connect Order DB : ${error}`)
    }
};


export default connectToOrderDb;