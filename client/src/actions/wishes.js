import { GET_WISHES, CREATE_WISH, DELETE_WISH, UPDATE_WISH } from '../constants/actionTypes';
import * as api from '../api';

export const getWishes = () => async (dispatch) => {
    try {
        const { data } = await api.getWishes();

        dispatch({ type: GET_WISHES, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const createWish = (wish) => async (dispatch) => {
    try {
        const { data } = await api.createWish(wish);

        dispatch({ type: CREATE_WISH, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteWish = (id) => async (dispatch) => {
    try {
        await api.deleteWish(id);

        dispatch({ type: DELETE_WISH, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const updateWish = (id, wish) => async (dispatch) => {
    try {
        const { data } = await api.updateWish(id, wish);

        dispatch({ type: UPDATE_WISH, payload: data });
    } catch (error) {
        console.log(error);
    }
}
