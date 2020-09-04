import axios from 'axios'
import {GET_STUDENTS, ADD_STUDENT, DELETE_STUDENT, STUDENTS_LOADING, GET_ONE_STUDENT} from '../actions/types'
import {tokenConfig} from "../actions/authActions"
import {returnError} from '../actions/errorActions'
export const getStudents = () => (dispatch, getState) => {
    dispatch(SetStudentsLoading());
    axios
        .get("api/students")
        .then(res => dispatch({
            type: GET_STUDENTS,
            payload: res.data
        }))
        .catch(err => dispatch(returnError(err.response.data, err.response.status)))
};
export const getOneStudent = (id) => (dispatch, getState) => {
    dispatch(SetStudentsLoading());
    axios
        .get(`api/students/${id}`)
        .then(res => dispatch({
            type: GET_ONE_STUDENT,
            payload: res.data
        }))
        .catch(err => dispatch(returnError(err.response.data, err.response.status)))
}

export const deleteStudent = id => (dispatch, getState) => {
    axios.delete(`api/students/${id}`, tokenConfig(getState))
    .then(res => dispatch ({
        type: DELETE_STUDENT,
        payload: id
    }))
    .catch(err => dispatch(returnError(err.response.data, err.response.status)))
};

export const addStudent = student =>  (dispatch, getState) => {
    axios
        .post("api/students", student, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_STUDENT,
            payload: res.data
        }))
        .catch(err => dispatch(returnError(err.response.data, err.response.status)))

}

export const SetStudentsLoading = () => {
    return {
        type: STUDENTS_LOADING
    }
}