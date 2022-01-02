import React, { useEffect } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import Userfront from '@userfront/react';

import Bookshelf from '../Bookshelf/Bookshelf';
import Wishlist from '../Wishlist/Wishlist';
import Matches from '../Matches/Matches';
import { socket } from '../../api/index';

const Dashboard = () => {

    const location = useLocation();

    useEffect(() => {
        if (Userfront.user.userUuid) socket.emit('atDashboard', Userfront.user.userUuid);
    });

    if (!Userfront.accessToken()) {
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
