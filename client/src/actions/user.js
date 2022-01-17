import Userfront from '@userfront/react';

import { USER_LOGGED_IN, GET_USER, UPDATE_USER, LOG_OUT } from '../constants/actionTypes';
import * as api from '../api';

export const userLoggedIn = (user) => async (dispatch) => {
    try {
        const { data } = await api.userLoggedIn(user);

        api.socket.emit('authenticated', user.userUuid);

        dispatch({ type: USER_LOGGED_IN, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getUser = () => async (dispatch) => {
    try {
        const { data } = await api.getUser();

        dispatch({ type: GET_USER, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = (user) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(user);

        dispatch({ type: UPDATE_USER, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const logOut = () => async (dispatch) => {
    try {
        Userfront.logout();
        api.socket.disconnect();
        dispatch({ type: LOG_OUT });
    } catch (error) {
        console.log(error);
    }
}
