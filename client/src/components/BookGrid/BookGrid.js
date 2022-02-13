import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, Card, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

import { deleteBook } from '../../actions/books';
import Book from './Book/Book';

const BookGrid = ({ handleEdit }) => {
    const dispatch = useDispatch();

    const books = useSelector((state) => state.books);

    const [bookIdForDeletion, setBookIdForDeletion] = useState(null);
    const [open, setOpen] = useState(false);

    const confirmBeforeDelete = (bookId) => {
        setOpen(true);
        setBookIdForDeletion(bookId);
    };

    const handleClose = (confirmed) => {
        if (confirmed) dispatch(deleteBook(bookIdForDeletion));
        setOpen(false);
    };

    return (
        <>
            <Grid container spacing={1.5} sx={{ mb: 1 }}>
                {books.length > 0 ?
                    books.map((book) => (
                        <Grid item
                            key={book._id}
                            xs={12} sm={6} md={4}
                            sx={{
                                width: '100%',
                                '& .MuiPaper-root': { height: '100%' },
                                '& .MuiPaper-root > .bookCardText': { height: 'calc(100% - 31px)' }
                            }}
                        >
                            <Book book={book} confirmBeforeDelete={confirmBeforeDelete} handleEdit={handleEdit} />
                        </Grid>
                    )) :
                    <Grid item sx={{ width: '100%', mt: 1 }}>
                        <Card elevation={4} sx={{ p: 2 }}>
                            <Typography variant="body1">Add some of your books to see them listed here!</Typography>
                        </Card>
                    </Grid>
                }
            </Grid>
            <Dialog
                open={open}
                onClose={() => handleClose(false)}
                aria-labelledby="book-alert-dialog-title"
            >
                <DialogTitle id="book-alert-dialog-title">Delete this book?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => handleClose(true)}>Yes</Button>
                    <Button onClick={() => handleClose(false)} autoFocus>No</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default BookGrid;
