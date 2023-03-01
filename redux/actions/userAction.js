import { createAction } from "@reduxjs/toolkit";

export const openDrawerAction = createAction('__SET_OPEN_DRAWER__', function prepare(open) {
    return {
        payload: {
            open,
        }
    }
})