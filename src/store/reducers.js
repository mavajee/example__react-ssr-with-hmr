import { combineReducers } from 'redux';
import counterReducer from './counter';

export const makeRootReducer = () => {
  return combineReducers({
    counter: counterReducer
  })
}