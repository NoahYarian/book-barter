import { USER_LOGGED_IN, GET_USER, UPDATE_USER, LOG_OUT} from '../constants/actionTypes';

const userReducer = (user = {}, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
        case GET_USER:
        case UPDATE_USER:
            return action.payload;
        case LOG_OUT:
            return {};
        default:
            return user;
    }
}

export default userReducer;
