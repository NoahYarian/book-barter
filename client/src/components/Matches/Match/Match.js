import { Card, Typography } from '@mui/material';
import React from 'react';

const Book = ({ match }) => {

    return (
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
        </Card>
    );
}

export default Book;
