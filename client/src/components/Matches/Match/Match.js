import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Typography, Button, TextField } from '@mui/material';

import { createMessage } from '../../../actions/messages';

const Match = ({ match }) => {
    const dispatch = useDispatch();

    const [isChatting, setIsChatting] = useState(false);
    const [textField, setTextField] = useState('');

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
                    {match.conversation.map((message) => {
                        return (
                            <div style={{ display: 'flex' }} key={message.time}>
                                <img src={message.from.imageURL} alt="avatar" style={{ width: "30px" }} />
                                <Typography variant="body2">{message.from.name} - {message.time} - {message.text}</Typography>
                            </div>
                        );
                    })}
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
