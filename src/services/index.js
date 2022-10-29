import axios from 'axios';
import {url as urlconf} from '../config';

const postFunction = async (route, data) => {
    const response = await axios.post(`${urlconf}${route}`, data, {
        headers: {
            authorization: `bearerHeader: ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};

const getFunction = async (route) => {
    const response = await axios.get(`${urlconf}${route}`, {
        headers: {
            authorization: `bearerHeader: ${localStorage.getItem('token')}`
        }
    });

    return response.data;
};

const patchFunction = async (route, data) => {
    await axios.patch(`${urlconf}${route}`, data, {
        headers: {
            authorization: `bearerHeader: ${localStorage.getItem('token')}`
        }
    });
    return {msg: 'success'};
};

export const getRestaurantByLevel = async () =>
    (await getFunction('getRestaurantByLevel')).restaurants;

export const getUsersByRestaurant = async (data) =>
    (await getFunction(`getUsersByRestaurant/${data}`)).users;

export const getManagersByRestaurant = async (data) =>
    (await getFunction(`getManagersByRestaurant/${data}`)).users;

export const addCashInService = async (data) =>
    postFunction('saveCashRegisterStartup', data);

export const addCashOutService = async (data) =>
    postFunction('saveCashRegisterEndups', data);

export const approveRejectCashRegisterStartup = async (data) =>
    patchFunction('approveRejectCashRegisterStartup', data);

export const cancelCashRegisterStartup = async (data) =>
    patchFunction('cancelCashRegisterStartup', data);

export const getCashInByDate = async (data) =>
    (await getFunction(`getCashInByDate/${data}`)).cashIns;

export const getCashOutByDate = async (data) =>
    (await getFunction(`getCashOutByDate/${data}`)).cashOuts;

export const cashOutApiInfo = async (data) =>
    getFunction(`cashOutApiInfo/${data}`);

export const getLastSafeCash = async (data) =>
    (await getFunction(`getLastSafeCash/${data}`)).safeCash;

export const countSafeCash = async () =>
    (await getFunction('countSafeCash')).message;

export const saveCashSafe = async (data) => postFunction('saveCashSafe', data);

export const approveRejectSafeCash = async (data) =>
    patchFunction('approveRejectSafeCash', data);

export const cancelSafeCash = async (data) =>
    patchFunction('cancelSafeCash', data);

export const getPipoByUser = async (data) =>
    patchFunction('getPipoByUser', data);

export const getCashInByEmployeeAndDate = async (data) =>
    (await getFunction(`getCashInByEmployeeAndDate/${data}`)).response;

export const approveRejectCashRegisterEndups = async (data) =>
    patchFunction('approveRejectCashRegisterEndups', data);

export const cancelCashRegisterEndups = async (data) =>
    patchFunction('cancelCashRegisterEndups', data);
