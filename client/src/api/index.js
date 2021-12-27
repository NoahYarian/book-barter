import axios from 'axios';
import Userfront from '@userfront/react';

const API = axios.create();

API.interceptors.request.use((req) => {
    if(Userfront.tokens?.accessToken) {
        req.headers.Authorization = `Bearer ${Userfront.tokens.accessToken}`;
    }
    return req;
});

export const getBooks = (area) => API.get(`/books/${area}`);
export const createBook = (newBook) => API.post('/books', newBook);
export const deleteBook = (id) => API.delete(`/books/${id}`);
export const updateBook = (id, updatedBook) => API.patch(`/books/${id}`, updatedBook);
