import {createSlice} from '@reduxjs/toolkit';

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
            localStorage.setItem('token', payload);
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
        loadUser: (state, {payload}) => {
            state.currentUser = payload;
        }
    }
});

export const {loginUser, logoutUser, loadUser} = authSlice.actions;

export default authSlice.reducer;
