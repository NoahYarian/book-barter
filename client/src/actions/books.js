import { GET_BOOKS, CREATE_BOOK } from '../constants/actionTypes';
import * as api from '../api';

export const getBooks = () => async (dispatch) => {
    try {
        const { data } = await api.getBooks();

        dispatch({ type: GET_BOOKS, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const createBook = (book) => async (dispatch) => {
    try {
        const { data } = await api.createBook(book);

        dispatch({ type: CREATE_BOOK, payload: data });
    } catch (error) {
        console.log(error);
    }
}
