import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';

import bookRoutes from './routes/books.js';
import wishRoutes from './routes/wishes.js';
import matchRoutes from './routes/matches.js';
import messageRoutes from './routes/messages.js';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/books', bookRoutes);
app.use('/wishes', wishRoutes);
app.use('/matches', matchRoutes);
app.use('/messages', messageRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to the API!");
});

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('testChat', (message) => {
        console.log(message);
        socket.emit('testChat', { line: 'I hear ya!', time: new Date().toISOString() });
    });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error));
