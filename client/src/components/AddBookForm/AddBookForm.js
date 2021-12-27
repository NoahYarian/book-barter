import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import { createBook, updateBook } from '../../actions/books';

const AddBookForm = ({ currentId, setCurrentId }) => {
    const dispatch = useDispatch();

    const initialState = { title: '', author: '', isbn: '', year: '', format: '', condition: '', details: '' };
    const [bookData, setBookData] = useState(initialState);

    const book = useSelector((state) => currentId ? state.books.find((book) => book._id === currentId) : null);

    useEffect(() => {
        if (book) setBookData(book);
    }, [book]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updateBook(currentId, bookData));
        } else {
            dispatch(createBook(bookData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setBookData(initialState);
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
                {/* <FormControl fullWidth>
                    <InputLabel id="format-select-label">Format</InputLabel>
                    <Select label-id="format-select-label" label="Format" value="">
                        <MenuItem value="hardcover">Hardcover</MenuItem>
                        <MenuItem value="paperback">Paperback</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="condition-select-label">Condition</InputLabel>
                    <Select label-id="condition-select-label" label="Condition" value="">
                        <MenuItem value="perfect">Perfect</MenuItem>
                        <MenuItem value="good">Good</MenuItem>
                        <MenuItem value="fair">Fair</MenuItem>
                        <MenuItem value="poor">Poor</MenuItem>
                    </Select>
                </FormControl> */}
                <TextField name="format" variant="outlined" label="Format" value={bookData.format} onChange={(e) => setBookData({ ...bookData, format: e.target.value })} />
                <TextField name="condition" variant="outlined" label="Condition" value={bookData.condition} onChange={(e) => setBookData({ ...bookData, condition: e.target.value })} />
                <TextField name="details" variant="outlined" label="Details" value={bookData.details} onChange={(e) => setBookData({ ...bookData, details: e.target.value })} />
                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default AddBookForm;
