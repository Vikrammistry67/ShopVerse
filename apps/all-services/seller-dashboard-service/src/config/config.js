import dotenv from 'dotenv';

dotenv.config();

const _config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    RABBITMQ_URL: process.env.RABBITMQ_URL
};


export default _config;