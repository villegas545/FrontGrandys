/* eslint-disable indent */
import axios from 'axios';
import {url as urlconf} from '../../config/index';

const url = `${urlconf}getCashRegisterEndups`;

const dataInitial = {
    data: [],
    lastFilter: ''
};

const GET_CASH_OUT_SUCCESS = 'GET_CASH_OUT_SUCCESS';

// actions
export const getCashOutAction = (formData) => async (dispatch, getState) => {
    try {
        console.log(getState());
        let urlFilter;
        if (formData === 'reload') {
            if (getState().cashOut.lastFilter === '') {
                return;
            }
            urlFilter = getState().cashOut.lastFilter;
        } else {
            urlFilter = `${url}?startDate=${formData.startDate}&endDate=${formData.endDate}&restaurant=${formData.restaurant}&employee=${formData.employee}&status=${formData.status}`;
        }

        let res = (
            await axios.get(urlFilter, {
                headers: {
                    authorization: `bearerHeader: ${localStorage.getItem(
                        'token'
                    )}`
                }
            })
        ).data.response;
        res = res.map((element) => {
            element.user = element.User.name;
            element.restaurant = element.Restaurant.name;
            return element;
        });

        dispatch({
            type: GET_CASH_OUT_SUCCESS,
            data: res,
            urlFilter
        });
    } catch (error) {
        console.log(error.data.response);
    }
};

export default function cashOutReducer(state = dataInitial, action) {
    switch (action.type) {
        case GET_CASH_OUT_SUCCESS:
            return {
                ...state,
                data: action.data,
                lastFilter: action.urlFilter
            };
        default:
            return state;
    }
}
