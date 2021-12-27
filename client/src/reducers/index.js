import { combineReducers } from 'redux';

import auth from './auth';
import books from './books';
import wishes from './wishes';

export default combineReducers({ auth, books, wishes });
