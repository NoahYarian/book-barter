import mongoose from 'mongoose';
import Book from '../models/book.js';
import Wish from '../models/wish.js';

export const getMatches = async (req, res) => {
    try {
        const books = await Book.find();
        const wishes = await Wish.find();

        const myBooks = getItemsForUser(books, req.userId);
        const myWishes = getItemsForUser(wishes, req.userId);

        const communityBooks = books.filter((book) => book.userId !== req.userId);
        const communityBooksIWant = getBooksMatchingWishes(communityBooks, myWishes);

        let matches = {};
        for (let i = 0; i < communityBooksIWant.length; i++) {

            const theirId = communityBooksIWant[i].userId;

            if (matches[theirId]) continue;

            const theirWishes = getItemsForUser(wishes, theirId);
            const theirBooks = getItemsForUser(books, theirId);

            const booksOfMineTheyWant = getBooksMatchingWishes(myBooks, theirWishes);
            const booksOfTheirsIWant = getBooksMatchingWishes(theirBooks, myWishes);

            if (booksOfMineTheyWant.length > 0) matches[theirId] = { booksOfMineTheyWant, booksOfTheirsIWant };
        }

        res.status(200).json(matches);
    } catch (error) {
        res.status(404).json({ messsage: error.message });
    }
}

const getBooksMatchingWishes = (books, wishes) => {
    let foundBooks = [];
    for (let i = 0, wish; i < wishes.length; i++) {
        wish = wishes[i];
        foundBooks.push(...books.filter((book) => isMatchingBookOrAuthor(book, wish)));
    }
    return foundBooks;
}

const isMatchingBookOrAuthor = (book, wish) => {
    return ((book.title === wish.title &&
            book.author === wish.author)
        || (wish.title === '' &&
            book.author === wish.author));
}

const getItemsForUser = (items, userId) => {
    return items.filter((item) => item.userId === userId);
}
