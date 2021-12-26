import mongoose from 'mongoose';
import Book from '../models/book.js';

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();

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