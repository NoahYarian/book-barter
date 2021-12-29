import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography, TextField, Button } from '@mui/material';
import Userfront from '@userfront/react';

import { createBook, updateBook } from '../../actions/books';

const AddBookForm = ({ currentBookId, setCurrentBookId }) => {
    const dispatch = useDispatch();

    const initialState = { title: '', author: '', isbn: '', year: '', format: '', condition: '', details: '', imageURL: '' };
    const [bookData, setBookData] = useState(initialState);

    const book = useSelector((state) => currentBookId ? state.books.find((book) => book._id === currentBookId) : null);

    const userId = Userfront.user?.userUuid;

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

    const bookLookupFromISBN = async () => {
        const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${bookData.isbn}&format=json&jscmd=data`);
        const data = await response.json();
        setBookData(prev => ({
            ...prev,
            title: data[`ISBN:${bookData.isbn}`].title,
            author: data[`ISBN:${bookData.isbn}`].authors[0].name,
            year: data[`ISBN:${bookData.isbn}`].publish_date,
            imageURL: `https://covers.openlibrary.org/b/isbn/${bookData.isbn}-M.jpg`
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
                <Button variant="outlined" color="secondary" size="small" onClick={bookLookupFromISBN}>Look Up</Button>
                <TextField name="format" variant="outlined" label="Format" value={bookData.format} onChange={(e) => setBookData({ ...bookData, format: e.target.value })} />
                <TextField name="condition" variant="outlined" label="Condition" value={bookData.condition} onChange={(e) => setBookData({ ...bookData, condition: e.target.value })} />
                <TextField name="details" variant="outlined" label="Details" value={bookData.details} onChange={(e) => setBookData({ ...bookData, details: e.target.value })} />
                { bookData.imageURL ? <img src={bookData.imageURL} alt="book cover" /> : <div><span>no image</span></div> }
                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default AddBookForm;
