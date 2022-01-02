import { GET_MESSAGES, CREATE_MESSAGE } from '../constants/actionTypes';
import * as api from '../api';

export const getMessages = () => async (dispatch) => {
    try {
        const { data } = await api.getMessages();

        dispatch({ type: GET_MESSAGES, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const createMessage = (message) => async (dispatch) => {
    try {
        const { data } = await api.createMessage(message);

        dispatch({ type: CREATE_MESSAGE, payload: data });
    } catch (error) {
        console.log(error);
    }
}
