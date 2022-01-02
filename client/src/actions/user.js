import { GET_USER, CREATE_USER, UPDATE_USER } from '../constants/actionTypes';
import * as api from '../api';

export const getUser = () => async (dispatch) => {
    try {
        const { data } = await api.getUser();

        dispatch({ type: GET_USER, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const createUser = (user) => async (dispatch) => {
    try {
        const { data } = await api.createUser(user);

        dispatch({ type: CREATE_USER, payload: data });
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
