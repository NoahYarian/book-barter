import { GET_WISHES, CREATE_WISH, DELETE_WISH, UPDATE_WISH } from '../constants/actionTypes';

const wishesReducer = (wishes = [], action) => {
    switch (action.type) {
        case GET_WISHES:
            return action.payload;
        case CREATE_WISH:
            return [...wishes, action.payload];
        case DELETE_WISH:
            return wishes.filter((wish) => wish._id !== action.payload);
        case UPDATE_WISH:
            return wishes.map((wish) => wish._id === action.payload._id ? action.payload : wish);
        default:
            return wishes;
    }
}

export default wishesReducer;
