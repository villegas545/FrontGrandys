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

export const addCashInService = async (data) =>
    postFunction('saveCashRegisterStartup', data);

export const approveRejectCashRegisterStartup = async (data) =>
    patchFunction('approveRejectCashRegisterStartup', data);

export const cancelCashRegisterStartup = async (data) =>
    patchFunction('cancelCashRegisterStartup', data);
