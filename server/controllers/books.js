import mongoose from 'mongoose';
import Book from '../models/book.js';

export const getBooks = async (req, res) => {
    const { area } = req.params;

    try {
        const books = await Book.find({ userId: req.userId, area });

        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ messsage: error.message });
    }
}

export const createBook = async (req, res) => {
    const book = req.body;

    const newBook = new Book(book);

    try {
        await newBook.save();

        res.status(201).json(newBook);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteBook = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No book with that id');

    const book = await Book.findByIdAndRemove(id);

    res.json({ message: 'Book deleted successfully' });
}

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const book = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No book with that id');

    const updatedBook = await Book.findByIdAndUpdate(id, book, { new: true });

    res.json(updatedBook);
}
