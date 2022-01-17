import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Userfront from '@userfront/react';

import { userLoggedIn, logOut } from "../../actions/user";
import { getBooks } from '../../actions/books';
import BookGrid from '../BookGrid/BookGrid';
import AddBookForm from '../AddBookForm/AddBookForm';

const Bookshelf = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [currentBookId, setCurrentBookId] = useState(null);

    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);


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
            <h1>Bookshelf</h1>
            <BookGrid setCurrentBookId={setCurrentBookId} />
            <AddBookForm currentBookId={currentBookId} setCurrentBookId={setCurrentBookId} />
        </div>
    );
}

export default Bookshelf;
