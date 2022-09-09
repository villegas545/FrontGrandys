/* eslint-disable indent */
import axios from 'axios';
import {url as urlconf} from '../../config/index';

const url = `${urlconf}getCashRegisterStartup?startDate=12/12/2012&endDate=12/12/2012`;

const dataInitial = {
    details: [],
    tableInfo: []
};

const GET_CASH_IN_SUCCESS = 'GET_CASH_IN_SUCCESS';

// actions
export const getCashInAction = () => async (dispatch) => {
    try {
        const res = (
            await axios.get(`${url}`, {
                headers: {
                    authorization: `bearerHeader: ${localStorage.getItem(
                        'token'
                    )}`
                }
            })
        ).data.response;
        const tableInfo = [];
        console.log(res);
        res.forEach((element) => {
            const coinsTotal =
                (element.pennies +
                    element.nickels * 5 +
                    element.dimes * 10 +
                    element.quarters * 25) /
                100;
            const billsTotal =
                element.ones +
                element.fives * 5 +
                element.twenties * 20 +
                element.fifties * 50 +
                element.hundreads * 100;
            tableInfo.push({
                id: element.id,
                user: element.User.name,
                restaurant: element.Restaurant.name,
                date: element.date,
                coinsTotal,
                billsTotal,
                grandTotal: coinsTotal + billsTotal,
                status: element.status
            });
        });
        dispatch({
            type: GET_CASH_IN_SUCCESS,
            details: res,
            tableInfo
        });
    } catch (error) {
        console.log(error.data.response);
    }
};

export default function cashInReducer(state = dataInitial, action) {
    switch (action.type) {
        case GET_CASH_IN_SUCCESS:
            return {
                ...state,
                details: action.details,
                tableInfo: action.tableInfo
            };
        default:
            return state;
    }
}
