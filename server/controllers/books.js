import mongoose from 'mongoose';
import Book from '../models/book.js';

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