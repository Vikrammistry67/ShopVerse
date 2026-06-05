import dotenvConfig from 'dotenv';

dotenvConfig.config();


const _config = {

    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URI: process.env.MONGO_URI,

    // RazorPay --> 
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_SECRET_ID: process.env.RAZORPAY_SECRET_ID

};


export default _config;