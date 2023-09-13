import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { registerAction } from '../actions/registerAction';

export const registerSlice = createSlice({
    name: 'register',
    initialState: {
        email: '',
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(registerAction, (state, action) => {
            state.email = action.payload.email
            return state
        }).addCase(HYDRATE, (state, action) => {
            state.email = ''
            return state
        }).addDefaultCase((state, action) => { })
    }
})

export const selectEmail = state => state.register.email;

export default registerSlice.reducer