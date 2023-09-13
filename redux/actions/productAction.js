import { createAction } from "@reduxjs/toolkit"


export const setProductPropertiesAction = createAction('__SET_PRODUCT_PROPERTIES__', function prepare(properties) {
    return {
        payload: {
            properties,
        }
    }
})