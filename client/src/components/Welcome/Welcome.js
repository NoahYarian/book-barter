import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Userfront from '@userfront/react';

import { userLoggedIn, logOut } from "../../actions/user";

const Welcome = () => {

    const location = useLocation();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

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
        <Navigate
            to={{
                pathname: "/bookshelf",
                state: { from: location }
            }}
        />
    );
}

export default Welcome;
