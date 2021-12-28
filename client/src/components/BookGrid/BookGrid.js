import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';

import Book from './Book/Book';

const BookGrid = ({ setCurrentBookId }) => {
    const books = useSelector((state) => state.books);

    return (
        <Grid container>
            {books.map((book) => (
                <Grid item key={book._id}>
                    <Book book={book} setCurrentBookId={setCurrentBookId} />
                </Grid>
            ))}
        </Grid>
    );
}

export default BookGrid;