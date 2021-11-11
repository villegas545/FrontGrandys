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

// acciones

export const getChecksAction = () => async (dispatch) => {
    /* console.log('getState', getState().rest.offset); */

    try {
        const res = await axios.get(`${url}`);

        dispatch({
            type: GET_CHECKS_SUCCESS,
            payload: res.data
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

        default:
            return state;
    }
}
