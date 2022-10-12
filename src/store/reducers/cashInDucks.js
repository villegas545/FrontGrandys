/* eslint-disable indent */
import axios from 'axios';
import {currencyFormat} from '@app/services/utils';
import {url as urlconf} from '../../config/index';
// const url = `${urlconf}getCashRegisterStartup?startDate=12/12/2012&endDate=12/12/2012`;
const url = `${urlconf}getCashRegisterStartup`;

const dataInitial = {
    details: [],
    tableInfo: [],
    lastFilter: '',
    cashTotal: 0
};

const GET_CASH_IN_SUCCESS = 'GET_CASH_IN_SUCCESS';

// actions
export const getCashInAction = (formData) => async (dispatch, getState) => {
    try {
        console.log(getState());
        let urlFilter;
        if (formData === 'reload') {
            urlFilter = getState().cashIn.lastFilter;
        } else {
            urlFilter = `${url}?startDate=${formData.startDate}&endDate=${formData.endDate}&restaurant=${formData.restaurant}&employee=${formData.employee}&status=${formData.status}`;
        }

        const res = (
            await axios.get(urlFilter, {
                headers: {
                    authorization: `bearerHeader: ${localStorage.getItem(
                        'token'
                    )}`
                }
            })
        ).data.response;
        const tableInfo = [];
        console.log(res);
        let totalTotal = 0;
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
            totalTotal =
                Number(totalTotal) + Number(coinsTotal) + Number(billsTotal);
            tableInfo.push({
                id: element.id,
                user: element.User.name,
                restaurant: element.Restaurant.name,
                date: element.date,
                coinsTotal: currencyFormat(coinsTotal),
                billsTotal: currencyFormat(billsTotal),
                grandTotal: currencyFormat(coinsTotal + billsTotal),
                status: element.status
            });
        });
        console.log('total', totalTotal);
        dispatch({
            type: GET_CASH_IN_SUCCESS,
            details: res,
            tableInfo,
            urlFilter,
            cashTotal: totalTotal
        });
    } catch (error) {
        console.log(error);
    }
};

export default function cashInReducer(state = dataInitial, action) {
    switch (action.type) {
        case GET_CASH_IN_SUCCESS:
            return {
                ...state,
                details: action.details,
                tableInfo: action.tableInfo,
                lastFilter: action.urlFilter,
                cashTotal: action.cashTotal
            };
        default:
            return state;
    }
}
