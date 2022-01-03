import { USER_LOGGED_IN, GET_USER, UPDATE_USER } from '../constants/actionTypes';

const userReducer = (user = {}, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
        case GET_USER:
        case UPDATE_USER:
            return action.payload;
        default:
            return user;
    }
}

export default userReducer;
