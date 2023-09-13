import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import counterSlice from './slices/counterSlice'
import registerSlice from './slices/registerSlice';
import userSlice from './slices/userSlice';
import productSlice from './slices/productSlice';
/* import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension';
import thunk from 'redux-thunk';

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
} */

const makeStore = () => configureStore({
    reducer: {
        register: registerSlice,
        user: userSlice,
        product: productSlice
    },
    devTools: true,
    // middleware: bindMiddleware([thunk])

})

export const wrapper = createWrapper(makeStore);