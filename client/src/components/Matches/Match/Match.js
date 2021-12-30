import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, TextField } from '@mui/material';
import { io } from 'socket.io-client';

const Match = ({ match }) => {
    const [isChatting, setIsChatting] = useState(false);
    const [chat, setChat] = useState({
        conversation: [],
        textField: ''
    });

    const [socket] = useState(() => io('ws://localhost:5000', {transports: ['websocket']}));

    useEffect(() => {
        socket.on('testChat', (message) => {
            console.log(message);
            setChat((prev) => {
                let newConvo = prev.conversation.slice();
                newConvo.push(message);
                return { ...prev, conversation: newConvo };
            });
        });
        return () => {
            socket.off('testChat');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        let newConvo = chat.conversation.slice();
        let message = { line: chat.textField, time: new Date().toISOString() };
        newConvo.push(message);
        setChat({
            conversation: newConvo,
            textField: ''
        });
        socket.emit('testChat', message);
    }

     return (
         <div>
            <Card>
                <Typography variant="h5">{match.theirId}</Typography>
                <Typography variant="body2">Books of theirs I want:</Typography>
                <ul>
                    { match.booksOfTheirsIWant.map((book) => (
                        <li key={book._id}>{book.author} - {book.title}</li>
                    ))}
                </ul>
                <Typography variant="body2">Books of mine they want:</Typography>
                <ul>
                    { match.booksOfMineTheyWant.map((book) => (
                        <li key={book._id}>{book.author} - {book.title}</li>
                    ))}
                </ul>
                <Button variant="contained" color="secondary" size="small" onClick={() => setIsChatting(!isChatting)} fullWidth>{isChatting ? 'Hide' : 'Show'} Chat</Button>
            </Card>
            { isChatting &&
                <Card>
                    {chat.conversation.map((message) => {
                        return (
                            <Typography variant="body2" key={message.time}>You: {message.line}</Typography>
                        );
                    })}
                    <form onSubmit={handleSubmit}>
                        <TextField name="chat" variant="outlined" label="Type a message" value={chat.textField} onChange={(e) => setChat({ ...chat, textField: e.target.value })} />
                        <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Send</Button>
                    </form>
                </Card>
            }
        </div>
    );
}

export default Match;
