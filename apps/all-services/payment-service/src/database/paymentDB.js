import mongoose from 'mongoose';
import _config from '../config/config.js';


const connectToPaymentDB = async () => {
    try {
        await mongoose.connect(_config.MONGO_URI);
        console.log(`payment database connected succesfully !`);
    } catch (error) {
        new Error(`failed to connect payment database ${error}`);
    };
};


export default connectToPaymentDB;