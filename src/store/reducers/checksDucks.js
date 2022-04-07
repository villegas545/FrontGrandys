/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import axios from 'axios';
import {url as urlconf} from '../../config/index';

const url = `${urlconf}check`;

// constantes
const dataInicial = {
    array: [],
    dates: []
};

// types

const GET_CHECKS_SUCCESS = 'GET_CHECKS_SUCCESS';
const GET_CHECKS_DATES_SUCCESS = 'GET_CHECKS_DATES_SUCCESS';
const GET_CHECKS_CLEANDATES_SUCCESS = 'GET_CHECKS_CLEANDATES_SUCCESS';
const GET_CHECKS_SUCCESS_CLEAN = 'GET_CHECKS_SUCCESS_CLEAN';

// acciones

export const getChecksAction =
    (startWeek, endWeek, startYear, endYear, byWeek) => async (dispatch) => {
        /* console.log('getState', getState().rest.offset); */
        console.log('estas recargando el duckChecks');
        try {
            const res = await axios.get(
                `${url}/${startWeek}/${endWeek}/${startYear}/${endYear}/${byWeek}`,
                {
                    headers: {
                        authorization: `bearerHeader: ${localStorage.getItem(
                            'token'
                        )}`
                    }
                }
            );
            if (res.data.message === 'datos') {
                const role = localStorage.getItem('role');
                const api = localStorage.getItem('restaurantApi');
                console.log('role', role);
                if (role !== 'Admin') {
                    res.data.response = res.data.response.filter(
                        (restaurant) =>
                            restaurant.api.replace(/ /g, '') ===
                            api.replace(/ /g, '')
                    );
                }
                dispatch({
                    type: GET_CHECKS_SUCCESS,
                    payload: res.data.response
                });
            } else {
                dispatch({
                    type: GET_CHECKS_DATES_SUCCESS,
                    payload: res.data.respuesta
                });
            }
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

/* ______________________________________________________ */

export const getChecksCleanDatesSuccess = () => async (dispatch) => {
    /* console.log('getState', getState().rest.offset); */

    try {
        const res = [];

        dispatch({
            type: GET_CHECKS_CLEANDATES_SUCCESS,
            payload: res
        });
    } catch (error) {
        console.log(error);
    }
};
/* ___________________________________________________________ */

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
        case GET_CHECKS_DATES_SUCCESS:
            return {...state, dates: action.payload};
        case GET_CHECKS_CLEANDATES_SUCCESS:
            return {...state, dates: action.payload};
        case GET_CHECKS_SUCCESS_CLEAN:
            return {...state, array: action.payload};
        default:
            return state;
    }
}
