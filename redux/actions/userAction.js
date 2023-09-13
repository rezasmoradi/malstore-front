import { createAction } from "@reduxjs/toolkit";

export const openDrawerAction = createAction('__SET_OPEN_DRAWER__', function prepare(open) {
    return {
        payload: {
            open,
        }
    }
})

export const changeColorThemeAction = createAction('__CHANGE_COLOR_THEME__', function prepare(theme) {
    return {
        payload: {
            theme,
        }
    }
})

export const changeViewAction = createAction('__CHANGE_VIEW__', function prepare(view) {
    return {
        payload: {
            view,
        }
    }
})