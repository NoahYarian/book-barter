import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Userfront from '@userfront/react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { userLoggedIn, logOut } from "../../actions/user";
import { getBooks } from '../../actions/books';
import BookGrid from '../BookGrid/BookGrid';
import AddBookForm from '../AddBookForm/AddBookForm';

const Bookshelf = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const initialState = { title: '', author: '', isbn: '', year: null, format: '', condition: '', details: '', imageURL: '' };
    const [bookData, setBookData] = useState(initialState);
    const [currentBookId, setCurrentBookId] = useState(null);
    const [accordionExpanded, setAccordionExpanded] = useState(false);

    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    const clear = () => {
        setCurrentBookId(null);
        setBookData(initialState);
    }

    const handleEdit = (bookId) => {
        clear();
        setCurrentBookId(bookId);
        setAccordionExpanded(true);
        window.scrollTo(0,0);
    }

    if (Userfront.accessToken()) {
        if (!user.name) dispatch(userLoggedIn(Userfront.user));
    } else {
        dispatch(logOut());
        return (
            <Navigate
                to={{
                    pathname: "/login",
                    state: { from: location }
                }}
            />
        );
    }

    return (
        <div>
            <Accordion expanded={accordionExpanded} onChange={() => setAccordionExpanded(prev => !prev)} sx={{ mb: accordionExpanded ? 0 : 1.5 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Add a book</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AddBookForm currentBookId={currentBookId} bookData={bookData} setBookData={setBookData} clear={clear} />
                </AccordionDetails>
            </Accordion>
            <BookGrid handleEdit={handleEdit} />
        </div>
    );
}

export default Bookshelf;
