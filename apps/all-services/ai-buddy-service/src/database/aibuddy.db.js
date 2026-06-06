import mongoose from 'mongoose';
import _config from '../config/config.js';


const connectToAiBuddyDatabase = async () => {
    try {
        await mongoose.connect(_config.MONGO_URI);
        console.log(`AI-Buddy database connected successfullly`);
    } catch (error) {
        console.log(error);
        new Error(`faild to connect aibuddy database${error}`);
    };
};


export default connectToAiBuddyDatabase;
