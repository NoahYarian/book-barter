import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, Card } from '@mui/material';

import Book from './Book/Book';

const BookGrid = ({ setCurrentBookId }) => {
    const books = useSelector((state) => state.books);

    return (
        <Grid container sx={{ mb: 1 }}>
            {books.length > 0 ?
                books.map((book) => (
                    <Grid item key={book._id} sx={{ width: '100%', mt: 1 }}>
                        <Book book={book} setCurrentBookId={setCurrentBookId} />
                    </Grid>
                )) :
                <Grid item sx={{ width: '100%', mt: 1 }}>
                    <Card elevation={4} sx={{ p: 2 }}>
                        <Typography variant="body1">Add some of your books to see them listed here!</Typography>
                    </Card>
                </Grid>
            }
        </Grid>
    );
}

export default BookGrid;
