import dotenvConfig from 'dotenv';

dotenvConfig.config();

const _config = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET
};


export default _config;