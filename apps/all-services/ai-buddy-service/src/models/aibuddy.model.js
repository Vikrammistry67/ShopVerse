import mongoose from 'mongoose';


const aibuddySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        


    }, { timestamps: true });

const aibuddyModel = mongoose.model('aibuddy', aibuddySchema);

export default aibuddyModel;