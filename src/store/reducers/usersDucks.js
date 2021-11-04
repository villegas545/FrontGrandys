/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import axios from 'axios';
import {url as urlconf} from '../../config/index';

const url = `${urlconf}user`;

// constantes
const dataInicial = {
    array: [],
    offset: 0
};

// types
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const DELETE_USERS_SUCCESS = 'DELETE_USERS_SUCCESS';

// acciones
export const getUsersAction = () => async (dispatch, getState) => {
    /* console.log('getState', getState().users.offset); */
    const {offset} = getState().users;

    try {
        const res = await axios.get(`${url}`);
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};
export const deleteUsersAction = (id) => async (dispatch, getState) => {
    try {
        await axios.delete(`${url}/${id}`);
        const res = await axios.get(`${url}`);
        dispatch({
            type: DELETE_USERS_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

// reducer
export default function usersReducer(state = dataInicial, action) {
    switch (action.type) {
        case DELETE_USERS_SUCCESS:
            return {...state, array: action.payload};
        case GET_USERS_SUCCESS:
            return {...state, array: action.payload};
        default:
            return state;
    }
}
