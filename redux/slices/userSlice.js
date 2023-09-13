import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { changeColorThemeAction, changeViewAction, openDrawerAction } from '../actions/userAction';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        drawerIsOpen: true,
        theme: 'light',
        view: 'grid'
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(openDrawerAction, (state, action) => {
            state.open = action.payload.open
            return state
        }).addCase(changeColorThemeAction, (state, action) => {
            state.theme = action.payload.theme
            return state
        }).addCase(changeViewAction, (state, action) => {
            state.view = action.payload.view
            return state
        }).addCase(HYDRATE, (state, action) => {
            state.open = false
            return state
        }).addDefaultCase((state, action) => { })
    }
})

export const selectDrawerIsOpen = state => state.user.drawerIsOpen;
export const selectTheme = state => state.user.theme;
export const selectView = state => state.user.view;

export default userSlice.reducer