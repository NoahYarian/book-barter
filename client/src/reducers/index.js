import { combineReducers } from 'redux';

import user from './user';
import books from './books';
import wishes from './wishes';
import matches from './matches';
import messages from './messages';

export default combineReducers({ user, books, wishes, matches, messages });
