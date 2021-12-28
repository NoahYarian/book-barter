import { GET_MATCHES } from '../constants/actionTypes';
import * as api from '../api';

export const getMatches = () => async (dispatch) => {
    try {
        const { data } = await api.getMatches();

        dispatch({ type: GET_MATCHES, payload: data });
    } catch (error) {
        console.log(error);
    }
}
