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
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('role');
            }
        }
    }
});

export const {loginUser, logoutUser, loadUser} = authSlice.actions;

export default authSlice.reducer;
