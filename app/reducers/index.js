import { combineReducers } from 'redux';
import reduce from '../reducer.js';
import {userReducer} from './user.js';

export const rootReducer = combineReducers({
  state: reduce,
  user: userReducer,
});
