import { combineReducers } from 'redux';
import authReducer from './authReducer';
import studentReducer from './studentReducer';

const rootReducer = combineReducers({
  studentReducer,
  authReducer
});

export default rootReducer;
