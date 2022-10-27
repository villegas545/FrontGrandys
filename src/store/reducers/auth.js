import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {url as urlconf} from '../../config/index';

const url = `${urlconf}check`;
const initialState = {
    isLoggedIn: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
    currentUser: {
        email: 'mail@example.com',
        picture: null
    }
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, {payload}) => {
            localStorage.setItem('token', payload.token);
            localStorage.setItem('user', payload.name);
            localStorage.setItem('role', payload.role);
            localStorage.setItem('restaurantApi', payload.restaurantApi);
            localStorage.setItem('idUser', payload.idUser);
            state.isLoggedIn = true;
            state.token = payload;
        },
        logoutUser: (state) => {
            console.log(state);
            /*  localStorage.removeItem('token');
            state.currentUser = {};
            state.isLoggedIn = false;
            state.token = null; */
        },
        loadUser: async (state, {payload}) => {
            state.currentUser = payload;
            try {
                await axios.get(`${url}/validate`, {
                    headers: {
                        authorization: `bearerHeader: ${localStorage.getItem(
                            'token'
                        )}`
                    }
                });
                console.log('validate');
            } catch (error) {
                console.log('click');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('role');
                localStorage.removeItem('restaurantApi');
                window.location.href = '/';
            }
        }
    }
});

export const {loginUser, logoutUser, loadUser} = authSlice.actions;

export default authSlice.reducer;
