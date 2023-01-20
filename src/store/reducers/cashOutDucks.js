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
            element.coinsTotalCurrency = currencyFormat(element.coinsTotal);
            element.billsTotalCurrency = currencyFormat(element.billsTotal);
            element.grandTotalCurrency = currencyFormat(element.grandTotal);
            element.pipoCurrency = currencyFormat(element.pipo);
            element.differenceCurrency = currencyFormat(element.difference);
            element.owedToHouseCurrency = currencyFormat(element.expected);
            element.cashSalesCurrency = currencyFormat(element.cashSales);
            element.creditSalesCurrency = currencyFormat(element.creditSales);
            element.drawerInCurrency = currencyFormat(
                Number(element.totalJson.drawerIn.grandTotal)
            );
            element.drawerOutCurrency = currencyFormat(
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
