import {combineReducers} from 'redux'
import studentReducer from './studentReducers';
import errorReducer from './errorReducers';
import authReducer from "./authReducers"


export default combineReducers({
    student: studentReducer,
    error: errorReducer,
    auth: authReducer
});