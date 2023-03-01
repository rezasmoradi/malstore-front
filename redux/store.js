/* import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './reducers/rootReducer';

const initalState = {};

const middleware = [thunk];

export const store = createStore(
    rootReducer,
    initalState,
    composeWithDevTools(applyMiddleware(...middleware))
)

const makeStore = () => store;

export const wrapper = createWrapper(makeStore); */


import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import counterSlice from './slices/counterSlice'
import registerSlice from './slices/registerSlice';
import userSlice from './slices/userSlice';

const makeStore = () => configureStore({
    reducer: {
        counter: counterSlice,
        register: registerSlice,
        user: userSlice,
    },
    devTools: true,
})

export const wrapper = createWrapper(makeStore);