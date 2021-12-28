import { GET_MATCHES } from '../constants/actionTypes';

const matchesReducer = (matches = [], action) => {
    switch (action.type) {
        case GET_MATCHES:
            return action.payload;
        default:
            return matches;
    }
}

export default matchesReducer;
