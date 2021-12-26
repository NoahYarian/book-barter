import axios from 'axios';

const API = axios.create();

export const createBook = (newBook) => API.post('/books', newBook);
