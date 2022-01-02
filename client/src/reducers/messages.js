import { GET_MESSAGES, CREATE_MESSAGE } from '../constants/actionTypes';

const messagesReducer = (messages = [], action) => {
    switch (action.type) {
        case GET_MESSAGES:
        case CREATE_MESSAGE:
            return action.payload;
        default:
            return messages;
    }
}

export default messagesReducer;
