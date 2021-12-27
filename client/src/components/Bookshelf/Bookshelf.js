import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getBooks } from '../../actions/books';
import BookList from '../BookList/BookList';
import AddBookForm from '../AddBookForm/AddBookForm';

const Bookshelf = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    return (
        <div>
            <h1>Bookshelf</h1>
            <BookList setCurrentId={setCurrentId} />
            <AddBookForm currentId={currentId} setCurrentId={setCurrentId} />
        </div>
    );
}

export default Bookshelf;
