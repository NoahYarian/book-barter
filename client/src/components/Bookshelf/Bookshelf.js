import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getBooks } from '../../actions/books';
import BookGrid from '../BookGrid/BookGrid';
import AddBookForm from '../AddBookForm/AddBookForm';

const Bookshelf = () => {
    const [currentBookId, setCurrentBookId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    return (
        <div>
            <h1>Bookshelf</h1>
            <BookGrid setCurrentBookId={setCurrentBookId} />
            <AddBookForm currentBookId={currentBookId} setCurrentBookId={setCurrentBookId} />
        </div>
    );
}

export default Bookshelf;
