import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getBooks } from '../../actions/books';
import BookGrid from '../BookGrid/BookGrid';
import AddBookForm from '../AddBookForm/AddBookForm';

const BookCollection = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    return (
        <div>
            <h1>BookCollection</h1>
            <BookGrid setCurrentId={setCurrentId} />
            <AddBookForm currentId={currentId} setCurrentId={setCurrentId} />
        </div>
    );
}

export default BookCollection;
