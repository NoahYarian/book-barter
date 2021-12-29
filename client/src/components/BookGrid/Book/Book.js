import { Card, Typography, Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteBook } from '../../../actions/books';

const Book = ({ book, setCurrentBookId }) => {
    const dispatch = useDispatch();

    return (
        <Card>
            <Typography variant="h5">{book.title}</Typography>
            <Typography variant="h6">by {book.author}</Typography>
            <Typography variant="body2">ISBN: {book.isbn}</Typography>
            <Typography variant="body2">Year: {book.year}</Typography>
            <Typography variant="body2">Format: {book.format}</Typography>
            <Typography variant="body2">Condition: {book.condition}</Typography>
            <Typography variant="body2">Details: {book.details}</Typography>
            { book.imageURL && <img src={book.imageURL} alt="book cover" /> }
            <Button size="small" variant="outlined" color="primary" onClick={() => setCurrentBookId(book._id)}>Edit</Button>
            <Button size="small" variant="contained" color="error" onClick={() => dispatch(deleteBook(book._id))}>Delete</Button>
        </Card>
    );
}

export default Book;
