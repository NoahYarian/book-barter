import mongoose from 'mongoose';
import Book from '../models/book.js';
import Wish from '../models/wish.js';
import Message from '../models/message.js';

export const getMatches = async (req, res) => {
    try {
        const myId = req.userId;

        const books = await Book.find();
        const wishes = await Wish.find();
        const messages = await Message.find({ $or: [{ from: myId }, { to: myId }] });

        const myBooks = getItemsForUser(books, myId);
        const myWishes = getItemsForUser(wishes, myId);

        const communityBooks = books.filter((book) => book.userId !== myId);
        const communityBooksIWant = getBooksMatchingWishes(communityBooks, myWishes);

        let matchesLog = [];
        let matches = [];
        for (let i = 0; i < communityBooksIWant.length; i++) {

            const theirId = communityBooksIWant[i].userId;

            if (matchesLog.indexOf(theirId) !== -1) continue;

            const theirWishes = getItemsForUser(wishes, theirId);
            const theirBooks = getItemsForUser(books, theirId);

            const booksOfMineTheyWant = getBooksMatchingWishes(myBooks, theirWishes);
            const booksOfTheirsIWant = getBooksMatchingWishes(theirBooks, myWishes);

            if (booksOfMineTheyWant.length > 0) {
                matchesLog.push(theirId);
                const conversation = messages.filter((message) => message.to === theirId || message.from === theirId);
                conversation.sort((m1, m2) => m1.time - m2.time);
                matches.push({ myId, theirId, booksOfMineTheyWant, booksOfTheirsIWant, conversation });
            }
        }

        res.status(200).json(matches);
    } catch (error) {
        res.status(404).json({ messsage: error.message });
    }
}

export const getBooksMatchingWishes = (books, wishes) => {
    let foundBooks = [];
    for (let i = 0; i < wishes.length; i++) {
        foundBooks.push(...books.filter((book) => isMatchingBookOrAuthor(book, wishes[i])));
    }
    return foundBooks;
}

export const isMatchingBookOrAuthor = (book, wish) => {
    return ((book.title === wish.title &&
            book.author === wish.author)
        || (wish.title === '' &&
            book.author === wish.author));
}

export const getItemsForUser = (items, userId) => {
    return items.filter((item) => item.userId === userId);
}
