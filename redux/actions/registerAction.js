import { createAction } from "@reduxjs/toolkit";

export const registerAction = createAction('__SET_EMAIL__', function prepare(email) {
    return {
        payload: {
            email,
        }
    }
})
