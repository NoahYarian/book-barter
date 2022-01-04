import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    from: { 
        type: String,
        required: true
    },
    to: { 
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
});

export default mongoose.model('Message', messageSchema);
