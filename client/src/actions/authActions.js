import { USER_LOADING, USER_LOADED, AUTH_ERROR, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_FAIL } from './types'
import Axios from 'axios';
import {returnError} from './errorActions'
//check token and load user
export const loadUser = () => (dispatch, getState) => {
    //User Loading
    dispatch({type: USER_LOADING});
    //Get token from local storage
    
    //if token add to headers
    Axios
        .get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnError(err.response.data, err.response.status));
            dispatch({
                    type: AUTH_ERROR
                })
        })
}
export const register = ({name, email, password}) => dispatch => {
    const config = {
        headers: {
            "Content-Type" : 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password});
    Axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnError(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}
export const login = ({email, password}) => dispatch => {
    const config = {
        headers: {
            "Content-Type" : 'application/json'
        }
    };
    const body = JSON.stringify({email, password});
    Axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnError(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}



export const tokenConfig = getState => {
    const token = getState().auth.token;
    const config = {
        headers: {
            "Content-type": "application/json"
          }}
        if (token){
            config.headers['x-auth-token'] = token;
        }
        return config;
    }