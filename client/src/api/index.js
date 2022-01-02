import axios from 'axios';
import Userfront from '@userfront/react';
import { io } from 'socket.io-client';

const API = axios.create();

export const socket = io('ws://localhost:5000', {transports: ['websocket']});

API.interceptors.request.use((req) => {
    if(Userfront.tokens?.accessToken) {
        req.headers.Authorization = `Bearer ${Userfront.tokens.accessToken}`;
    }
    return req;
});

export const getUser = () => API.get('/user');
export const createUser = (newUser) => API.post('/user', newUser);
export const updateUser = (updatedUser) => API.patch('/user', updatedUser);

export const getBooks = () => API.get('/books');
export const createBook = (newBook) => API.post('/books', newBook);
export const deleteBook = (id) => API.delete(`/books/${id}`);
export const updateBook = (id, updatedBook) => API.patch(`/books/${id}`, updatedBook);

export const getWishes = () => API.get('/wishes');
export const createWish = (newWish) => API.post('/wishes', newWish);
export const deleteWish = (id) => API.delete(`/wishes/${id}`);
export const updateWish = (id, updatedWish) => API.patch(`/wishes/${id}`, updatedWish);

export const getMatches = () => API.get('/matches');

export const getMessages = () => API.get('/messages');
export const createMessage = (newMessage) => API.post('/messages', newMessage);
