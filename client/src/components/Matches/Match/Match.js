import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Typography, Button, TextField, List, ListItem } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { createMessage } from '../../../actions/messages';
import { updateMatchWithSentMessage, updateMatchWithReceivedMessage } from '../../../actions/matches';
import { socket } from '../../../api/index';

dayjs.extend(relativeTime);

const Match = ({ match }) => {
    const dispatch = useDispatch();

    const [isChatting, setIsChatting] = useState(false);
    const [textField, setTextField] = useState('');

    useEffect(() => {
        socket.on("newMessage", (message) => {
            dispatch(updateMatchWithReceivedMessage(message));
        });

        return () => {
            socket.off("newMessage");
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        let message = {
            from: match.myUser,
            to: match.theirUser,
            text: textField,
            time: new Date()
         };
        setTextField('');
        dispatch(createMessage(message));
        dispatch(updateMatchWithSentMessage(match.theirUser.userId, message));
        socket.emit("message", message);
    }

     return (
         <div>
            <Card>
                <Typography variant="h5">{match.theirUser.name}</Typography>
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
                    <List sx={{ overflow: "auto", maxHeight: 250}}>
                        {match.conversation.map((message) => {
                            return (
                                <ListItem style={{ display: 'flex' }} key={message.time}>
                                    <img src={message.from.imageURL} alt="avatar" style={{ width: "30px" }} />
                                    <Typography variant="body2">{message.from.name} - {dayjs(message.time).fromNow()} - {message.text}</Typography>
                                </ListItem>
                            );
                        })}
                    </List>
                    <form onSubmit={handleSubmit}>
                        <TextField name="chat" variant="outlined" label="Type a message" value={textField} onChange={(e) => setTextField(e.target.value)} />
                        <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Send</Button>
                    </form>
                </Card>
            }
        </div>
    );
}

export default Match;
