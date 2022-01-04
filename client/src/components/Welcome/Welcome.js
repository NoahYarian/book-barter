import React from "react";
import { useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Userfront from '@userfront/react';
import { socket } from '../../api/index';

import { userLoggedIn } from "../../actions/user";

const Welcome = () => {

    const location = useLocation();
    const dispatch = useDispatch();

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
        <Navigate
            to={{
                pathname: "/dashboard",
                state: { from: location }
            }}
        />
    );
}

export default Welcome;
