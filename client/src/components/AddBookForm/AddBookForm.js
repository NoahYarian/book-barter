import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Backdrop, Select, FormControl, MenuItem, InputLabel, Typography } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import dayjs from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';

import { createBook, updateBook } from '../../actions/books';
import Scanner from '../Scanner/Scanner';

const AddBookForm = ({ currentBookId, bookData, setBookData, clear }) => {
    const dispatch = useDispatch();

    const book = useSelector((state) => currentBookId ? state.books.find((book) => book._id === currentBookId) : null);
    const userId = useSelector((state) => state.user.userId);

    const [backdropIsOpen, setBackdropIsOpen] = useState(false);
    const handleCloseScanner = () => setBackdropIsOpen(false);
    const handleToggleScanner = () => setBackdropIsOpen(!backdropIsOpen);

    useEffect(() => {
        if (book) setBookData(book);
    }, [book, setBookData]);

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

    const bookLookupFromISBN = async (isbn) => {
        if (!(isbn.length === 13 || isbn.length === 10) || isNaN(Number(isbn))) return;
        const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
        const data = await response.json();
        const isbnData = data[`ISBN:${isbn}`];
        if (!isbnData?.title ||
            !isbnData?.authors ||
            !isbnData?.authors[0]?.name ||
            !isbnData?.publish_date) return;

        setBookData(prev => ({
            ...prev,
            isbn,
            title: isbnData.title,
            author: isbnData.authors[0].name,
            year: dayjs(isbnData.publish_date),
            imageURL: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
        }));
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { mt: 1 },
            }}
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Button color="primary" variant="contained" onClick={handleToggleScanner} sx={{ mt: -1 }} fullWidth>
                <Typography><FontAwesomeIcon icon={faBarcode} />&nbsp;&nbsp;Scan Barcode</Typography>
            </Button>

            <Backdrop open={backdropIsOpen} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Button variant="outlined" color="secondary" size="small" onClick={handleCloseScanner}>Close Scanner</Button>
                <Scanner handleCloseScanner={handleCloseScanner} backdropIsOpen={backdropIsOpen}  bookLookupFromISBN={bookLookupFromISBN} />
            </Backdrop>

            <Box fullWidth sx={{  textAlign: 'center' }}>
                <TextField name="isbn" variant="outlined" label="ISBN" value={bookData.isbn} onChange={(e) => setBookData({ ...bookData, isbn: e.target.value })} sx={{ width: "calc(100% - 76px)", mr: 1 }} />
                <Button variant="contained" color="primary" size="large" onClick={() => bookLookupFromISBN(bookData.isbn)} sx={{ mt: 1, height: '56px' }}><SearchIcon /></Button>
            </Box>

            <TextField name="title" variant="outlined" label="Title" value={bookData.title} onChange={(e) => setBookData({ ...bookData, title: e.target.value })} required fullWidth />

            <TextField name="author" variant="outlined" label="Author" value={bookData.author} onChange={(e) => setBookData({ ...bookData, author: e.target.value })} required fullWidth />

            <Box fullWidth>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DatePicker
                        label="Year"
                        views={['year']}
                        value={bookData.year}
                        maxDate={dayjs()}
                        onChange={(newValue) => setBookData({ ...bookData, year: newValue })}
                        renderInput={(params) => <TextField {...params} sx={{ width: '100px', mr: 1 }} />}
                    />
                </LocalizationProvider>

                <FormControl sx={{ mt: 1, width: 'calc(100% - 108px)' }}>
                    <InputLabel id="condition-select-label">Condition *</InputLabel>
                    <Select labelId="condition-select-label" label="Condition" value={bookData.condition} onChange={(e) => setBookData({ ...bookData, condition: e.target.value })}>
                        <MenuItem value="As New">As New</MenuItem>
                        <MenuItem value="Fine">Fine</MenuItem>
                        <MenuItem value="Very Good">Very Good</MenuItem>
                        <MenuItem value="Good">Good</MenuItem>
                        <MenuItem value="Fair">Fair</MenuItem>
                        <MenuItem value="Poor">Poor</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <FormControl sx={{ mt: 1 }} fullWidth>
                <InputLabel id="format-select-label">Format *</InputLabel>
                <Select labelId="format-select-label" label="Format" value={bookData.format} onChange={(e) => setBookData({ ...bookData, format: e.target.value })}>
                    <MenuItem value="Hardcover">Hardcover</MenuItem>
                    <MenuItem value="Trade Paperback">Trade Paperback</MenuItem>
                    <MenuItem value="Mass Market Paperback">Mass Market Paperback</MenuItem>
                </Select>
            </FormControl>

            <TextField name="imageURL" variant="outlined" label="Cover Image URL" value={bookData.imageURL} onChange={(e) => setBookData({ ...bookData, imageURL: e.target.value })} fullWidth />
            <TextField name="details" variant="outlined" label="Details" value={bookData.details} onChange={(e) => setBookData({ ...bookData, details: e.target.value })} multiline fullWidth />
            {bookData.imageURL && <Box fullWidth sx={{ textAlign: 'center', mt: 1 }}><img src={bookData.imageURL} alt="book cover" /></Box>}

            <Button sx={{ mt: 1 }} variant="contained" color="primary" size="large" type="submit" fullWidth><Typography>Submit</Typography></Button>
            <Button sx={{ mt: 1 }} variant="contained" color="error" size="small" onClick={clear} fullWidth><Typography>Clear</Typography></Button>
        </Box>
    );
}

export default AddBookForm;
