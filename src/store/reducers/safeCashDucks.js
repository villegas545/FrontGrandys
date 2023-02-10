/* eslint-disable indent */
import {currencyFormat} from '@app/services/utils';
import axios from 'axios';
// import {currencyFormat} from '@app/services/utils';
import {url as urlconf} from '../../config/index';

const url = `${urlconf}getSafeCash`;

const dataInitial = {
    data: [],
    wizardCashIns: [],
    wizardCashOuts: [],
    wizardVouchers: [],
    wizardTotalExpected: [],
    wizardTotalReal: [],
    wizardSafeDrawerIn: {
        pennies: 0,
        nickels: 0,
        dimes: 0,
        quarters: 0,
        ones: 0,
        twos: 0,
        fives: 0,
        tens: 0,
        twenties: 0,
        fifties: 0,
        hundreds: 0,
        total: 0
    },
    wizardSafeDrawerOut: {
        pennies: 0,
        nickels: 0,
        dimes: 0,
        quarters: 0,
        ones: 0,
        twos: 0,
        fives: 0,
        tens: 0,
        twenties: 0,
        fifties: 0,
        hundreds: 0,
        total: 0
    },
    wizardSafeStart: {
        pennies: 0,
        nickels: 0,
        dimes: 0,
        quarters: 0,
        ones: 0,
        twos: 0,
        fives: 0,
        tens: 0,
        twenties: 0,
        fifties: 0,
        hundreds: 0,
        total: 0
    },
    wizardDate: '',
    totalTotal: 0
};

const GET_SAFE_CASH_SUCCESS = 'GET_SAFE_CASH_SUCCESS';

export const wizardVoucher = (data) => async (dispatch) => {
    console.log(data);
    dispatch({
        type: data.type,
        data
    });
};

export const getSafeCashAction = (formData) => async (dispatch, getState) => {
    try {
        console.log(getState());
        let urlFilter;
        if (formData === 'reload') {
            urlFilter = getState().safeCash.lastFilter;
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
        console.log(res);
        const totalTotal = 0;
        /* res = res.map((element) => {
            console.log(element);
            const coinsTotal =
                (element.pennies +
                    element.nickels * 5 +
                    element.dimes * 10 +
                    element.quarters * 25) /
                100;
            console.log(coinsTotal);
            const billsTotal =
                element.ones +
                element.twos * 2 +
                element.fives * 5 +
                element.tens * 10 +
                element.twenties * 20 +
                element.fifties * 50 +
                element.hundreds * 100;
            console.log(billsTotal);

            totalTotal =
                Number(totalTotal) + Number(coinsTotal) + Number(billsTotal);
            console.log(totalTotal);
            console.log(currencyFormat(coinsTotal));
            element.coinsTotal = currencyFormat(coinsTotal);
            element.billsTotal = currencyFormat(billsTotal);
            element.currencyinitSafe = currencyFormat(element.initSafe);
            element.currencyVouchersIn = currencyFormat(element.vouchersIn);
            element.currencyVouchersOut = currencyFormat(element.vouchersOut);
            element.currencyDiference = currencyFormat(
                element.expectedAmount - element.realAmount
            );
            element.currencyExpectedAmount = currencyFormat(
                element.expectedAmount
            );
            element.currencyCashIn = element.cashIn;
            element.currencyCashOut = element.cashOut;

            element.grandTotal = currencyFormat(element.realAmount);
            element.restaurant = element.Restaurant.name;
            element.user = element.User.name;
            return element;
        }); */

        res = res.map((item) => {
            item.jsonValues.wizardCashIns.grandTotalCurrency = currencyFormat(
                item.jsonValues.wizardCashIns.grandTotal
            );
            item.jsonValues.wizardCashOuts.grandTotalCurrency = currencyFormat(
                item.jsonValues.wizardCashOuts.grandTotal
            );
            item.jsonValues.wizardSafeStart.grandTotalCurrency = currencyFormat(
                item.jsonValues.wizardSafeStart.grandTotal
            );
            item.jsonValues.wizardSafeDrawerIn.grandTotalCurrency =
                currencyFormat(item.jsonValues.wizardSafeDrawerIn.grandTotal);
            item.jsonValues.wizardSafeDrawerOut.grandTotalCurrency =
                currencyFormat(item.jsonValues.wizardSafeDrawerOut.grandTotal);
            item.jsonValues.wizardTotalExpected.grandTotalCurrency =
                currencyFormat(item.jsonValues.wizardTotalExpected.grandTotal);

            // Cashout Dwr In & Dwr Out Columns
            item.jsonValues.wizardCashOuts.drawerIn.grandTotalCurrency =
                currencyFormat(
                    item.jsonValues.wizardCashOuts.drawerIn.grandTotal
                );
            item.jsonValues.wizardCashOuts.drawerOut.grandTotalCurrency =
                currencyFormat(
                    item.jsonValues.wizardCashOuts.drawerOut.grandTotal
                );
            item.jsonValues.wizardCashOuts.cashOutSummary = currencyFormat(
                Number(item.jsonValues.wizardCashOuts.drawerIn.grandTotal) +
                    Number(item.jsonValues.wizardCashOuts.drawerOut.grandTotal)
            );
            // Vouchers 5 columns
            item.jsonValues.wizardVouchers.vouchersIns.grandTotalCurrency =
                currencyFormat(
                    item.jsonValues.wizardVouchers.vouchersIns.grandTotal
                );
            item.jsonValues.wizardVouchers.vouchersOuts.grandTotalCurrency =
                currencyFormat(
                    item.jsonValues.wizardVouchers.vouchersOuts.grandTotal
                );
            item.jsonValues.wizardVouchers.vouchersDrawerToSafe.grandTotalCurrency =
                currencyFormat(
                    item.jsonValues.wizardVouchers.vouchersDrawerToSafe
                        .grandTotal
                );
            item.jsonValues.wizardVouchers.vouchersSafeToDrawer.grandTotalCurrency =
                currencyFormat(
                    item.jsonValues.wizardVouchers.vouchersDrawerToSafe
                        .grandTotal
                );
            item.jsonValues.wizardVouchers.grandTotalCurrency = currencyFormat(
                item.jsonValues.wizardVouchers.grandTotal
            );
            item.jsonValues.wizardTotalExpected.expected.grandTotalCurrency =
                currencyFormat(
                    item.jsonValues.wizardTotalExpected.expected.grandTotal
                );

            //! EXPECTED
            const expectedDrawerBackGrandTotal =
                Number(
                    item.jsonValues.wizardSafeStart.realAmount.drawerIn
                        .grandTotal
                ) -
                Number(item.jsonValues.wizardCashIns.grandTotal) +
                Number(item.jsonValues.wizardCashOuts.drawerIn.grandTotal) +
                Number(
                    item.jsonValues.wizardVouchers.vouchersSafeToDrawer
                        .grandTotal
                ) -
                Number(
                    item.jsonValues.wizardVouchers.vouchersDrawerToSafe
                        .grandTotal
                );
            item.jsonValues.wizardExpected = {};
            item.jsonValues.wizardExpected.grandTotalCurrency = currencyFormat(
                expectedDrawerBackGrandTotal
            );

            //! DIFERENCE(Real Total)
            const earningsDifferenceCoins =
                Number(
                    item.jsonValues.wizardTotalExpected.expected.coinsTotal
                ) - Number(item.jsonValues.wizardSafeDrawerOut.real.coinsTotal);
            const earingsDifferenceBills =
                Number(
                    item.jsonValues.wizardTotalExpected.expected.billsTotal
                ) - Number(item.jsonValues.wizardSafeDrawerOut.real.billsTotal);
            const earningsDifferenceGrandTotal =
                Number(earningsDifferenceCoins) +
                Number(earingsDifferenceBills);
            item.jsonValues.wizardDifference = {};
            item.jsonValues.wizardDifference.grandTotalCurrency =
                currencyFormat(earningsDifferenceGrandTotal);

            return item;
        });

        res.totalTotal = totalTotal;
        dispatch({
            type: GET_SAFE_CASH_SUCCESS,
            data: res,
            urlFilter,
            totalTotal
        });
    } catch (error) {
        console.log(error);
    }
};

export default function safeCashReducer(state = dataInitial, action) {
    switch (action.type) {
        case GET_SAFE_CASH_SUCCESS:
            return {
                ...state,
                data: action.data,
                lastFilter: action.urlFilter,
                totalTotal: action.totalTotal
            };
        case 'wizardCashIns':
            return {
                ...state,
                wizardCashIns: action.data.cashIns,
                wizardDate: action.data.date
            };
        case 'wizardCashOuts':
            return {
                ...state,
                wizardCashOuts: action.data.cashOuts
            };
        case 'wizardVouchers':
            return {
                ...state,
                wizardVouchers: action.data.vouchers
            };
        case 'wizardTotalExpected':
            return {
                ...state,
                wizardTotalExpected: action.data.initValues
            };
        case 'wizardTotalReal':
            return {
                ...state,
                wizardTotalReal: action.data.form
            };
        case 'wizardSafeStart':
            return {
                ...state,
                wizardSafeStart: action.data.total
            };
        case 'wizardDate':
            return {
                ...state,
                wizardDate: action.data.date
            };
        case 'wizardSafeDrawerIn':
            return {
                ...state,
                wizardSafeDrawerIn: action.data.total
            };
        case 'wizardSafeDrawerOut':
            return {
                ...state,
                wizardSafeDrawerOut: action.data.total
            };
        default:
            return state;
    }
}
