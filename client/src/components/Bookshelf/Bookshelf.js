import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getBooks } from '../../actions/books';
import BookList from '../BookList/BookList';
import AddBookForm from '../AddBookForm/AddBookForm';

const Bookshelf = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    return (
        <div>
            <h1>Bookshelf</h1>
            <BookList />
            <AddBookForm />
        </div>
    );
}

export default Bookshelf;
