import mongoose from 'mongoose';
import _config from '../config/config.js';

const connectToSellerDashboardDB = async () => {
    try {
        await mongoose.connect(_config.MONGO_URI);
        console.log(`Seller Dashboard database connected successfully`);
    } catch (error) {
        console.log(`ERROR : `, error);
        new Error(`failed to connect seller dashboard database ${error}`);
    };
};


export default connectToSellerDashboardDB;