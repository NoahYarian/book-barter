import React from 'react';

import BookList from '../BookList/BookList';
import AddBookForm from '../AddBookForm/AddBookForm';

const Wishlist = () => {
    return (
        <div>
            <h1>Wishlist</h1>
            <BookList />
            <AddBookForm />
        </div>
    );
}

export default Wishlist;
