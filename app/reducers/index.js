import { combineReducers } from 'redux';
import reduce from '../reducer.js';

// let reducer2 = function(state = {}, action) {
//   if (action.type==='DO_STH') return Object.assign({}, state);
//   return Object.assign({}, state);
// };

export const rootReducer = combineReducers({
  state: reduce
});
