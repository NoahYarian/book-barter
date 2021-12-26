import { CREATE_BOOK } from '../constants/actionTypes';

const booksReducer = (books = [], action) => {
    switch (action.type) {
        case CREATE_BOOK:
            return [...books, action.payload];
        default:
            return books;
    }
}

export default booksReducer;
