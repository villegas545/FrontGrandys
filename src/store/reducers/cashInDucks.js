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
        let urlFilter;
        if (formData === 'reload') {
            if (getState().cashIn.lastFilter === '') {
                return;
            }
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
                    100 +
                (element.penniesRoll * 50 +
                    element.nickelsRoll * 5 * 40 +
                    element.dimesRoll * 10 * 50 +
                    element.quartersRoll * 25 * 40) /
                    100;
            const billsTotal =
                element.ones +
                element.twos * 2 +
                element.fives * 5 +
                element.tens * 10 +
                element.twenties * 20 +
                element.fifties * 50 +
                element.hundreads * 100;
            totalTotal =
                Number(totalTotal) + Number(coinsTotal) + Number(billsTotal);
            element.user = element.User.name;
            element.restaurant = element.Restaurant.name;
            element.coinsTotal = currencyFormat(coinsTotal);
            element.billsTotal = currencyFormat(billsTotal);
            element.grandTotal = currencyFormat(coinsTotal + billsTotal);
            element.idUser = element.User.id;
            tableInfo.push(element);
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
