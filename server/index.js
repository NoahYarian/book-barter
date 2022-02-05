import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';

import userRoutes from './routes/user.js';
import bookRoutes from './routes/books.js';
import wishRoutes from './routes/wishes.js';
import matchRoutes from './routes/matches.js';
import messageRoutes from './routes/messages.js';
import debugRoutes from './routes/debug.js';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    "origin": process.env.ENVIRONMENT === "development" ? "*" : "https://book-barter.noahyarian.com",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

app.use(cors(corsOptions));

app.use('/user', userRoutes);
app.use('/books', bookRoutes);
app.use('/wishes', wishRoutes);
app.use('/matches', matchRoutes);
app.use('/messages', messageRoutes);
app.use('/debug', debugRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to the API!");
});

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: corsOptions });

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error));

let loggedInUsers = [];

io.on('connection', (socket) => {
    socket.on('authenticated', (userId) => {
        if (!userId) return;

        if (loggedInUsers.findIndex((user) => user.userId === userId) === -1) loggedInUsers.push({ userId, socketId: socket.id });

        console.log(`[authenticated] loggedInUsers: ${JSON.stringify(loggedInUsers)}`);
    });

    socket.on("disconnect", (reason) => {
        const indexOfSocket = loggedInUsers.findIndex((user) => user.socketId === socket.id);
        if (indexOfSocket === -1) return;

        let newLoggedInUsersArr = loggedInUsers.slice();
        newLoggedInUsersArr.splice(indexOfSocket, 1);
        loggedInUsers = newLoggedInUsersArr;

        console.log(`[disconnect] loggedInUsers: ${JSON.stringify(loggedInUsers)}`);
    });

    socket.on("message", (message) => {
        const recipientSocketIndex = loggedInUsers.findIndex(user => user.userId === message.to.userId);
        if ( recipientSocketIndex !== -1) {
            const recipientSocket = loggedInUsers[recipientSocketIndex].socketId;
            socket.to(recipientSocket).emit("newMessage", message);
        }
    });
});
