import React from 'react';

import BookGrid from '../BookGrid/BookGrid';
import AddBookForm from '../AddBookForm/AddBookForm';

const Wishlist = () => {
    return (
        <div>
            <h1>Wishlist</h1>
            <BookGrid />
            <AddBookForm />
        </div>
    );
}

export default Wishlist;
