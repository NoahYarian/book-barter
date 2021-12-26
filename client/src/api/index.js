import axios from 'axios';

const API = axios.create();

export const getBooks = () => API.get('/books');
export const createBook = (newBook) => API.post('/books', newBook);
export const deleteBook = (id) => API.delete(`/books/${id}`);
