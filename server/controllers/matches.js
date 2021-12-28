import mongoose from 'mongoose';
import Book from '../models/book.js';
import Wish from '../models/wish.js';

export const getMatches = async (req, res) => {
    try {
        const books = await Book.find();
        const wishes = await Wish.find();
        const myBooks = books.filter((book) => book.userId === req.userId);
        const myWishes = wishes.filter((wish) => wish.userId === req.userId);
        const otherBooks = books.filter((book) => book.userId !== req.userId);

        let foundBooks = [];
        for (let i = 0, wish; i < myWishes.length; i++) {
            wish = myWishes[i];
            foundBooks.push(...otherBooks.filter((book) => (book.title === wish.title && book.author === wish.author) ||
                                                           (wish.title === '' && book.author === wish.author)));
        }

        let matches = [];
        for (let i = 0, theirUserId, theirWishes; i < foundBooks.length; i++) {
            theirUserId = foundBooks[i].userId;
            theirWishes = wishes.filter((wish) => wish.userId === theirUserId);

            for (let j = 0, wish, myBooksThatTheyWant; j < theirWishes.length; j++) {
                wish = theirWishes[j]
                myBooksThatTheyWant = myBooks.filter((book) => (book.title === wish.title && book.author === wish.author) ||
                                                               (wish.title === '' && book.author === wish.author));
                if (myBooksThatTheyWant.length > 0) {
                    matches.push({ userId: theirUserId, myBooksThatTheyWant });
                }
            }
        }

        let finalMatches = {};
        for (let i = 0, theirUserId, theirBooks, theirBooksThatIWant = []; i < matches.length; i++) {
            if (finalMatches[theirUserId]) continue;
            theirUserId = matches[i].userId;
            theirBooks = otherBooks.filter((book) => book.userId === theirUserId);

            for (let j = 0, wish; j < myWishes.length; j++) {
                wish = myWishes[j];
                theirBooksThatIWant.push(...theirBooks.filter((book) => (book.title === wish.title && book.author === wish.author) ||
                                                                  (wish.title === '' && book.author === wish.author)));
            }
            finalMatches[theirUserId] = {
                myBooksThatTheyWant: matches[i].myBooksThatTheyWant,
                theirBooksThatIWant
            }
        }

        res.status(200).json(finalMatches);
    } catch (error) {
        res.status(404).json({ messsage: error.message });
    }
}

