import { GET_MATCHES, UPDATE_MATCH_WITH_SENT_MESSAGE, UPDATE_MATCH_WITH_RECEIVED_MESSAGE } from '../constants/actionTypes';
import * as api from '../api';

export const getMatches = () => async (dispatch) => {
    try {
        const { data } = await api.getMatches();

        dispatch({ type: GET_MATCHES, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateMatchWithSentMessage = (theirUserId, message) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_MATCH_WITH_SENT_MESSAGE, payload: { theirUserId, message } });
    } catch (error) {
        console.log(error);
    }
}

export const updateMatchWithReceivedMessage = (message) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_MATCH_WITH_RECEIVED_MESSAGE, payload: message });
    } catch (error) {
        console.log(error);
    }
}
