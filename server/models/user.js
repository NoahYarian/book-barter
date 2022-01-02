import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    imageURL: String,
    dateCreated: {
        type: String,
        required: true
    },
    lastLogin: {
        type: String,
        required: true
    },
});

export default mongoose.model('User', userSchema);
