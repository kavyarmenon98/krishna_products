import { createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';

const token = localStorage.getItem('token');
const userData = token ? jwtDecode(token) : null;

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: userData,
        token: token || null,
    
    },
    reducers: {
        loginUserAction: (state, action) => {
            state.token = action.payload.token;
            state.user = jwtDecode(action.payload.token);
            localStorage.setItem('token', action.payload.token);
        },
        registerUserAction: (state, action) => {
            state.token = action.payload.token;
            state.user = jwtDecode(action.payload.token);
            localStorage.setItem('token', action.payload.token);
        },
        logoutAction: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
        },
    },
});

export const { loginUserAction, registerUserAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;