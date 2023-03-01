import { createReducer } from "@reduxjs/toolkit";
import { registerAction } from "../actions/registerAction";

export const registerReducer = createReducer('', builder => {
    builder.addCase(registerAction, (state, action) => { state.email = action.payload.email })
})