import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const registerSlice = createSlice({
    name: 'register',
    initialState: {
        email: '',
    },
    reducers: {},
    extraReducers: {
        __SET_EMAIL__: (state, action) => {
            state.email = action.payload.email
        },
        [HYDRATE]: (state, action) => {
            state.email = ''
        }
    }
})

export const selectEmail = state => state.register.email;

export default registerSlice.reducer