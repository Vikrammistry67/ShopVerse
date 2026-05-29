import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },


    fullName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    status: {
        type: String,
        enum: ["active", "blocked"],
        default: "active",
        index: true,
    },

    password: {
        type: String,
        required: true
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    role: {
        type: String,
        enums: ['user', 'seller'],
        default: 'user'
    }


}, { timestamps: true });

// create index here ----> (for performace db queries)
userSchema.index({ email: 1, status: 1 });

const userModel = mongoose.model('user', userSchema);
export default userModel; 