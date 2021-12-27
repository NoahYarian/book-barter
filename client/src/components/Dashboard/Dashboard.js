import React from "react";
import { Navigate, useLocation } from 'react-router-dom';
import Userfront from '@userfront/react';

import Bookshelf from '../Bookshelf/Bookshelf';
import Wishlist from '../Wishlist/Wishlist';
import Matches from '../Matches/Matches';

const Dashboard = () => {

    const location = useLocation();

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
