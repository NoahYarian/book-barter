import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getBooks } from '../../actions/books';
import BookGrid from '../BookGrid/BookGrid';
import AddBookForm from '../AddBookForm/AddBookForm';

const BookCollection = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks("bookshelf"));
    }, [dispatch]);

    return (
        <div>
            <h1>BookCollection</h1>
            <BookGrid setCurrentId={setCurrentId} area="bookshelf" />
            <AddBookForm currentId={currentId} setCurrentId={setCurrentId} area="bookshelf" />
        </div>
    );
}

export default BookCollection;
