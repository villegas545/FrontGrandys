/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import axios from 'axios';
import {url as urlconf} from '../../config/index';

const url = `${urlconf}check`;

// constantes
const dataInicial = {
    array: []
};

// types

const GET_CHECKS_SUCCESS = 'GET_CHECKS_SUCCESS';
const GET_CHECKS_SUCCESS_CLEAN = 'GET_CHECKS_SUCCESS_CLEAN';

// acciones

export const getChecksAction = (startWeek, endWeek) => async (dispatch) => {
    /* console.log('getState', getState().rest.offset); */

    try {
        const res = await axios.get(`${url}/${startWeek}/${endWeek}`);

        dispatch({
            type: GET_CHECKS_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

export const getChecksActionClean = () => async (dispatch) => {
    /* console.log('getState', getState().rest.offset); */

    try {
        const res = [];

        dispatch({
            type: GET_CHECKS_SUCCESS,
            payload: res
        });
    } catch (error) {
        console.log(error);
    }
};

// reducer
export default function usersReducer(state = dataInicial, action) {
    switch (action.type) {
        case GET_CHECKS_SUCCESS:
            return {...state, array: action.payload};
        case GET_CHECKS_SUCCESS_CLEAN:
            return {...state, array: action.payload};
        default:
            return state;
    }
}
