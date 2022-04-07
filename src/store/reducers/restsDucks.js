/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import axios from 'axios';
import {url as urlconf} from '../../config/index';

const url = `${urlconf}restaurant`;

// constantes
const dataInicial = {
    array: [],
    offset: 0,
    records: {
        name: '',
        location: '',
        api: '',
        password: '',
        userName: ''
    },
    modalClose: false
};

// types
const ADD_REST_SUCCESS = 'ADD_REST_SUCCESS';
const GET_REST_SUCCESS = 'GET_REST_SUCCESS';
const GET_REST_BY_API_SUCCESS = 'GET_REST_BY_API_SUCCESS';
const DELETE_REST_SUCCESS = 'DELETE_REST_SUCCESS';
const UPDATE_REST_SUCCESS = 'UPDATE_REST_SUCCESS';
const RECORDS_UPDATE = 'RECORDS_UPDATE';
const MODAL_CLOSE = 'MODAL_CLOSE';

// acciones
export const modalClose = (boleano) => async (dispatch) => {
    dispatch({
        type: MODAL_CLOSE,
        payload: boleano
    });
};

export const recordsUpdate = (id) => async (dispatch) => {
    try {
        let res = [];
        if (id === 'empty') {
            res = {
                name: '',
                location: '',
                api: '',
                password: '',
                userName: ''
            };
        } else {
            res = await axios.get(`${url}/${id}`, {
                headers: {
                    authorization: `bearerHeader: ${localStorage.getItem(
                        'token'
                    )}`
                }
            });
            res = res.data;
        }

        dispatch({
            type: RECORDS_UPDATE,
            payload: res
        });
    } catch (error) {
        console.log(error);
    }
};
export const addRestAction = (records) => async (dispatch, getState) => {
    try {
        await axios.post(`${url}`, records, {
            headers: {
                authorization: `bearerHeader: ${localStorage.getItem('token')}`
            }
        });
        const res = await axios.get(`${url}`, {
            headers: {
                authorization: `bearerHeader: ${localStorage.getItem('token')}`
            }
        });
        dispatch({
            type: ADD_REST_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

export const getRestAction = () => async (dispatch, getState) => {
    const {offset} = getState().rest;

    try {
        const res = await axios.get(`${url}`, {
            headers: {
                authorization: `bearerHeader: ${localStorage.getItem('token')}`
            }
        });
        console.log(res);
        dispatch({
            type: GET_REST_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

export const getRestActionByApi = (api) => async (dispatch, getState) => {
    const {offset} = getState().rest;

    try {
        const res = await axios.get(`${urlconf}restaurants/${api}`, {
            headers: {
                authorization: `bearerHeader: ${localStorage.getItem('token')}`
            }
        });
        console.log(res);
        dispatch({
            type: GET_REST_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteRestAction = (id) => async (dispatch, getState) => {
    try {
        await axios.delete(`${url}/${id}`, {
            headers: {
                authorization: `bearerHeader: ${localStorage.getItem('token')}`
            }
        });
        const res = await axios.get(`${url}`, {
            headers: {
                authorization: `bearerHeader: ${localStorage.getItem('token')}`
            }
        });
        dispatch({
            type: DELETE_REST_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateRestAction = (records, id) => async (dispatch, getState) => {
    try {
        await axios.put(`${url}/${id}`, records, {
            headers: {
                authorization: `bearerHeader: ${localStorage.getItem('token')}`
            }
        });
        const res = await axios.get(`${url}`, {
            headers: {
                authorization: `bearerHeader: ${localStorage.getItem('token')}`
            }
        });
        dispatch({
            type: UPDATE_REST_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

// reducer
export default function restReducer(state = dataInicial, action) {
    switch (action.type) {
        case MODAL_CLOSE:
            return {...state, modalClose: action.payload};
        case ADD_REST_SUCCESS:
            return {...state, array: action.payload};
        case DELETE_REST_SUCCESS:
            return {...state, array: action.payload};
        case UPDATE_REST_SUCCESS:
            return {...state, array: action.payload};
        case GET_REST_SUCCESS:
            return {...state, array: action.payload};
        case RECORDS_UPDATE:
            return {...state, records: action.payload};
        case GET_REST_BY_API_SUCCESS:
            return {...state, array: action.payload};
        default:
            return state;
    }
}
