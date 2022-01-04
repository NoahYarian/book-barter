import React from "react";
import { useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Userfront from '@userfront/react';
import { socket } from '../../api/index';

import { userLoggedIn } from "../../actions/user";
import Bookshelf from '../Bookshelf/Bookshelf';
import Wishlist from '../Wishlist/Wishlist';
import Matches from '../Matches/Matches';

const Dashboard = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    if (Userfront.accessToken()) {
        socket.emit('authenticated', Userfront.user.userUuid);
        dispatch(userLoggedIn(Userfront.user));
    } else {
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
            <Bookshelf />
            <Wishlist />
            <Matches />
        </div>
    );
}

export default Dashboard;
