import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography, TextField, Button, Backdrop, Select, FormControl, MenuItem, InputLabel } from '@mui/material';

import { createBook, updateBook } from '../../actions/books';
import Scanner from '../Scanner/Scanner';

const AddBookForm = ({ currentBookId, setCurrentBookId }) => {
    const dispatch = useDispatch();

    const initialState = { title: '', author: '', isbn: '', year: '', format: '', condition: '', details: '', imageURL: '' };
    const [bookData, setBookData] = useState(initialState);

    const book = useSelector((state) => currentBookId ? state.books.find((book) => book._id === currentBookId) : null);
    const userId = useSelector((state) => state.user.userId);

    const [backdropIsOpen, setBackdropIsOpen] = useState(false);
    const handleCloseScanner = () => setBackdropIsOpen(false);
    const handleToggleScanner = () => setBackdropIsOpen(!backdropIsOpen);

    useEffect(() => {
        if (book) setBookData(book);
    }, [book]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const bookDataWithUserId = { ...bookData, userId };

        if (currentBookId) {
            dispatch(updateBook(currentBookId, bookDataWithUserId));
        } else {
            dispatch(createBook(bookDataWithUserId));
        }
        clear();
    }

    const clear = () => {
        setCurrentBookId(null);
        setBookData(initialState);
    }

    const bookLookupFromISBN = async (isbn) => {
        const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
        const data = await response.json();
        setBookData(prev => ({
            ...prev,
            isbn,
            title: data[`ISBN:${isbn}`].title,
            author: data[`ISBN:${isbn}`].authors[0].name,
            year: data[`ISBN:${isbn}`].publish_date,
            imageURL: `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
        }));
    }

    return (
        <Paper>
            <form onSubmit={handleSubmit}>
                <Typography variant="h6">
                    Add A Book
                </Typography>
                <TextField name="title" variant="outlined" label="Title" value={bookData.title} onChange={(e) => setBookData({ ...bookData, title: e.target.value })} />
                <TextField name="author" variant="outlined" label="Author" value={bookData.author} onChange={(e) => setBookData({ ...bookData, author: e.target.value })} />
                <TextField name="year" variant="outlined" label="Year" value={bookData.year} onChange={(e) => setBookData({ ...bookData, year: e.target.value })} />
                <TextField name="isbn" variant="outlined" label="ISBN" value={bookData.isbn} onChange={(e) => setBookData({ ...bookData, isbn: e.target.value })} />
                <Button variant="outlined" color="secondary" size="small" onClick={() => bookLookupFromISBN(bookData.isbn)}>Look Up</Button>

                <Button onClick={handleToggleScanner}>Scan Barcode</Button>
                <Backdrop open={backdropIsOpen} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Button variant="outlined" color="secondary" size="small" onClick={handleCloseScanner}>Close Scanner</Button>
                    <Scanner handleCloseScanner={handleCloseScanner} backdropIsOpen={backdropIsOpen}  bookLookupFromISBN={bookLookupFromISBN} />
                </Backdrop>

                <FormControl sx={{ minWidth: 225}}>
                    <InputLabel id="format-select-label">Format</InputLabel>
                    <Select labelId="format-select-label" label="Format" value={bookData.format} onChange={(e) => setBookData({ ...bookData, format: e.target.value })}>
                        <MenuItem value="hardcover">Hardcover</MenuItem>
                        <MenuItem value="tradePaperback">Trade Paperback</MenuItem>
                        <MenuItem value="massMarketPaperback">Mass Market Paperback</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 125 }}>
                    <InputLabel id="condition-select-label">Condition</InputLabel>
                    <Select labelId="condition-select-label" label="Condition" value={bookData.condition} onChange={(e) => setBookData({ ...bookData, condition: e.target.value })}>
                        <MenuItem value="AsNew">As New</MenuItem>
                        <MenuItem value="fine">Fine</MenuItem>
                        <MenuItem value="veryGood">Very Good</MenuItem>
                        <MenuItem value="good">Good</MenuItem>
                        <MenuItem value="fair">Fair</MenuItem>
                        <MenuItem value="poor">Poor</MenuItem>
                    </Select>
                </FormControl>

                <TextField sx={{ minWidth: 475 }} name="imageURL" variant="outlined" label="Cover Image URL" value={bookData.imageURL} onChange={(e) => setBookData({ ...bookData, imageURL: e.target.value })} />
                <TextField name="details" variant="outlined" label="Details" value={bookData.details} onChange={(e) => setBookData({ ...bookData, details: e.target.value })} fullWidth />
                {bookData.imageURL && <img src={bookData.imageURL} alt="book cover" />}

                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default AddBookForm;
