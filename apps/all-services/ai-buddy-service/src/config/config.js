import dotenvConfig from 'dotenv';

dotenvConfig.config();


const _config = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URI: process.env.MONGO_URI,
    GEMINI_API_KEY : process.env.GEMINI_API_KEY
};


export default _config;