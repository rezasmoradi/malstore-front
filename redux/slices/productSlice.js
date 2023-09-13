import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import { setProductPropertiesAction } from "../actions/productAction"

export const productSlice = createSlice({
  name: "product",
  initialState: {
    properties: {
      category_id: null,
      name: "",
      display_name: "",
      dimensions: [],
      model: "",
      long_desc: "",
      short_desc: "",
      weight: null,
      unit_price: "",
      meta_description: "",
      meta_keywords: "",
      meta_title: "",
      colors: [],
      images: [],
      tags: [],
      features: [],
      best_features: [],
      active: true,
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setProductPropertiesAction, (state, action) => {
        state.properties = { ...state.properties, ...action.payload.properties }
        return state
      }).addCase(HYDRATE, (state, action) => {
        state.properties = { ...state.properties }
        return state
      })
  },
})

export const selectProduct = state => state.product

export default productSlice.reducer
