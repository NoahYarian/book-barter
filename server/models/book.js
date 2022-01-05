import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: String,
    year: String,
    format: String,
    condition: String,
    details: String,
    userId: {
        type: String,
        required: true
    },
    imageURL: String,
});

export default mongoose.model('Book', bookSchema);
