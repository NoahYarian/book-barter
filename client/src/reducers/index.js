import { combineReducers } from 'redux';

import auth from './auth';
import books from './books';
import wishes from './wishes';
import matches from './matches';
import messages from './messages';

export default combineReducers({ auth, books, wishes, matches, messages });
