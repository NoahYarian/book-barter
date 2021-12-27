import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getBooks } from '../../actions/books';
import BookList from '../BookList/BookList';
import AddBookForm from '../AddBookForm/AddBookForm';

const Bookshelf = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks("bookshelf"));
    }, [dispatch]);

    return (
        <div>
            <h1>Bookshelf</h1>
            <BookList setCurrentId={setCurrentId} area="bookshelf" />
            <AddBookForm currentId={currentId} setCurrentId={setCurrentId} area="bookshelf" />
        </div>
    );
}

export default Bookshelf;
