import mongoose from 'mongoose';

const wishSchema = new mongoose.Schema({
    author: { 
        type: String,
        required: true
    },
    title: String,
    userId: { 
        type: String,
        required: true
    },
});

export default mongoose.model('Wish', wishSchema);
