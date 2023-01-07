/* eslint-disable indent */
import {currencyFormat} from '@app/services/utils';
import axios from 'axios';
import {url as urlconf} from '../../config/index';

const url = `${urlconf}getCashRegisterEndups`;

const dataInitial = {
    data: [],
    lastFilter: '',
    cashTotalTotal: 0,
    strikesTotal: 0,
    pipoTotal: 0,
    owedTotal: 0,
    difTotal: 0
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

        let cashTotalTotal = 0;
        let strikesTotal = 0;
        let pipoTotal = 0;
        let owedTotal = 0;
        let difTotal = 0;

        res = res.map((element) => {
            cashTotalTotal += Number(element.grandTotal);
            pipoTotal += Number(element.pipo);
            owedTotal += Number(element.expected);
            difTotal += Number(element.difference);
            element.strikes = 0;
            if (element.difference > 2 || element.difference < -2) {
                element.strikes = 1;
                strikesTotal += 1;
            }
            element.user = element.User.name;
            element.restaurant = element.Restaurant.name;
            element.coinsTotal = currencyFormat(element.coinsTotal);
            element.billsTotal = currencyFormat(element.billsTotal);
            element.grandTotal = currencyFormat(element.grandTotal);
            element.pipo = currencyFormat(element.pipo);
            element.difference = currencyFormat(element.difference);
            element.owedToHouse = currencyFormat(element.expected);
            element.cashSales = currencyFormat(element.cashSales);
            element.creditSales = currencyFormat(element.creditSales);
            element.drawerIn = currencyFormat(
                Number(element.totalJson.drawerIn.grandTotal)
            );
            element.drawerOut = currencyFormat(
                Number(element.totalJson.drawerOut.grandTotal)
            );
            console.log(element);
            return element;
        });

        dispatch({
            type: GET_CASH_OUT_SUCCESS,
            data: res,
            urlFilter,
            cashTotalTotal,
            strikesTotal,
            pipoTotal,
            owedTotal,
            difTotal
        });
    } catch (error) {
        console.log(error);
    }
};

export default function cashOutReducer(state = dataInitial, action) {
    switch (action.type) {
        case GET_CASH_OUT_SUCCESS:
            return {
                ...state,
                data: action.data,
                lastFilter: action.urlFilter,
                cashTotalTotal: action.cashTotalTotal,
                strikesTotal: action.strikesTotal,
                pipoTotal: action.pipoTotal,
                owedTotal: action.owedTotal,
                difTotal: action.difTotal
            };
        default:
            return state;
    }
}
