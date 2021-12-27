import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    year: String,
    format: String,
    condition: String,
    details: String,
    userId: String,
    area: String
});

export default mongoose.model('Book', bookSchema);