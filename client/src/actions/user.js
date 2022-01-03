import { USER_LOGGED_IN, GET_USER, UPDATE_USER } from '../constants/actionTypes';
import * as api from '../api';

export const userLoggedIn = (user) => async (dispatch) => {
    try {
        const { data } = await api.userLoggedIn(user);

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
