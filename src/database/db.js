import mongoose from "mongoose";
import _config from "../config/config.js";

const connectToDB = async () => {
    try {
        await mongoose.connect(_config.MONGO_URI);
        console.log(`database connected successfully`);
    } catch (error) {
        new Error(`ERROR : faild to connect database ${error}`);
    }
};

export default connectToDB;