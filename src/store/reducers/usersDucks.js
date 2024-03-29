/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import axios from 'axios';
import {url as urlconf} from '../../config/index';

const url = `${urlconf}user`;

// constantes
const dataInicial = {
    array: [],
    offset: 0,
    records: {
        name: '',
        email: '',
        password: '',
        roles: 'Empty'
    },
    modalClose: false
};

// types
const ADD_USERS_SUCCESS = 'ADD_USERS_SUCCESS';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const DELETE_USERS_SUCCESS = 'DELETE_USERS_SUCCESS';
const UPDATE_USERS_SUCCESS = 'UPDATE_USERS_SUCCESS';
const RECORDS_UPDATE = 'RECORDS_UPDATE';
const MODAL_CLOSE = 'MODAL_CLOSE';
const SYNC_USERS_SUCCESS = 'SYNC_USERS_SUCCESS';

// ACCIONES
//! CERRAR MODAL
export const modalClose = (boleano) => async (dispatch) => {
    dispatch({
        type: MODAL_CLOSE,
        payload: boleano
    });
};

//! RECORDS UPDATE
export const recordsUpdate = (id) => async (dispatch) => {
    try {
        let res = [];
        if (id === 'empty') {
            res = {
                name: '',
                email: '',
                password: '',
                roles: 'Empty',
                restaurantApi: ''
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

//! ADD USERS ACTION
export const addUsersAction = (records) => async (dispatch, getState) => {
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
            type: ADD_USERS_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

//! GET USERS ACTION
export const getUsersAction = () => async (dispatch, getState) => {
    const {offset} = getState().users;
    try {
        const res = await axios.get(`${url}`, {
            headers: {
                authorization: `bearerHeader: ${localStorage.getItem('token')}`
            }
        });
        res.data = res.data.map((user) => {
            user.restaurantName = user.Restaurant.restaurantName;
            return user;
        });
        console.log(res.data);

        dispatch({
            type: GET_USERS_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

//! DELETE USERS ACTION
export const deleteUsersAction = (id) => async (dispatch, getState) => {
    try {
        console.log(localStorage);
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
        console.log(res.data);
        dispatch({
            type: UPDATE_USERS_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

//! UPDATE USERS ACTION
export const updateUsersAction =
    (records, id) => async (dispatch, getState) => {
        try {
            await axios.put(`${url}/${id}`, records, {
                headers: {
                    authorization: `bearerHeader: ${localStorage.getItem(
                        'token'
                    )}`
                }
            });
            const res = await axios.get(`${url}`, {
                headers: {
                    authorization: `bearerHeader: ${localStorage.getItem(
                        'token'
                    )}`
                }
            });
            dispatch({
                type: UPDATE_USERS_SUCCESS,
                payload: res.data
            });
        } catch (error) {
            console.log(error);
        }
    };

//! SYNC USERS ACTION
export const syncUsers = () => async (dispatch) => {
    try {
        await axios.get(`${urlconf}syncUsers`, {
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
            type: SYNC_USERS_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

//! reducer
export default function usersReducer(state = dataInicial, action) {
    switch (action.type) {
        case MODAL_CLOSE:
            return {...state, modalClose: action.payload};
        case ADD_USERS_SUCCESS:
            return {...state, array: action.payload};
        case DELETE_USERS_SUCCESS:
            return {...state, array: action.payload};
        case UPDATE_USERS_SUCCESS:
            return {...state, array: action.payload};
        case GET_USERS_SUCCESS:
            return {...state, array: action.payload};
        case RECORDS_UPDATE:
            return {...state, records: action.payload};
        case SYNC_USERS_SUCCESS:
            return {...state, array: action.payload};
        default:
            return state;
    }
}
