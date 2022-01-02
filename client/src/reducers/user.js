import { GET_USER, CREATE_USER, UPDATE_USER } from '../constants/actionTypes';

const userReducer = (user = {}, action) => {
    switch (action.type) {
        case CREATE_USER:
        case GET_USER:
        case UPDATE_USER:
            return action.payload;
        default:
            return user;
    }
}

export default userReducer;
