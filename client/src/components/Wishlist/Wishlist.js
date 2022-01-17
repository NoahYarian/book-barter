import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Userfront from '@userfront/react';

import { userLoggedIn, logOut } from "../../actions/user";
import { getWishes } from '../../actions/wishes';
import WishGrid from '../WishGrid/WishGrid';
import AddWishForm from '../AddWishForm/AddWishForm';

const Wishlist = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [currentWishId, setCurrentWishId] = useState(null);

    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getWishes());
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
            <h1>Wishlist</h1>
            <WishGrid setCurrentWishId={setCurrentWishId} />
            <AddWishForm currentWishId={currentWishId} setCurrentWishId={setCurrentWishId} />
        </div>
    );
}

export default Wishlist;
