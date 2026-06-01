import mongoose from 'mongoose';
import _config from '../config/config.js';

const connectToCartDB = async () => {
    try {
        await mongoose.connect(_config.MONGO_URI);
        console.log(`Cart database connected successfully`);
    } catch (error) {
        new Error('ERROR failed to connect cart database')
    }
};


export default connectToCartDB;