import { Card, Typography } from '@mui/material';
import React from 'react';

const Book = ({ book }) => {
    return (
        <Card>
            <Typography variant="h5">{book.title}</Typography>
            <Typography variant="h6">by {book.author}</Typography>
            <Typography variant="body2">ISBN: {book.isbn}</Typography>
            <Typography variant="body2">Year: {book.year}</Typography>
            <Typography variant="body2">Format: {book.format}</Typography>
            <Typography variant="body2">Condition: {book.condition}</Typography>
            <Typography variant="body2">Details: {book.details}</Typography>
        </Card>
    );
}

export default Book;