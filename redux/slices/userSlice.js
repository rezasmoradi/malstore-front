import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        drawerIsOpen: true,
    },
    reducers: {},
    extraReducers: {
        __SET_OPEN_DRAWER__: (state, action) => {
            state.open = action.payload.open
        },
        [HYDRATE]: (state, action) => {
            state.open = false
        }
    }
})

export const selectDrawerIsOpen = state => state.user.drawerIsOpen;

export default userSlice.reducer