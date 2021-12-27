import { GET_BOOKS, CREATE_BOOK, DELETE_BOOK, UPDATE_BOOK } from '../constants/actionTypes';

const booksReducer = (books = [], action) => {
    switch (action.type) {
        case GET_BOOKS:
            return action.payload;
        case CREATE_BOOK:
            return [...books, action.payload];
        case DELETE_BOOK:
            return books.filter((book) => book._id !== action.payload);
        case UPDATE_BOOK:
            return books.map((book) => book._id === action.payload._id ? action.payload : book);
        default:
            return books;
    }
}

export default booksReducer;
