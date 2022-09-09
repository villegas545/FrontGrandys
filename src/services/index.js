import axios from 'axios';
import {url as urlconf} from '../config';

const postFunction = async (route, data) => {
    console.log(data);
    await axios.post(`${urlconf}${route}`, data, {
        headers: {
            authorization: `bearerHeader: ${localStorage.getItem('token')}`
        }
    });
    return {msg: 'success'};
};

export const addCashInService = async (data) =>
    postFunction('saveCashRegisterStartup', data);
