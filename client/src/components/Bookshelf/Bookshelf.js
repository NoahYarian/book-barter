import React from 'react';

import BookList from '../BookList/BookList';
import AddBookForm from '../AddBookForm/AddBookForm';

const Bookshelf = () => {
    return (
        <div>
            <h1>Bookshelf</h1>
            <BookList />
            <AddBookForm />
        </div>
    );
}

export default Bookshelf;
