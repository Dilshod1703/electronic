import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
  loading: false,
  error: null,
  products: [],
}

export const producstSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
    },
    setProducts: (state, { payload }) => {
      state.loading = false
      state.error = null
      state.products = payload
    },
    setError: (state, { payload }) => {
      state.error = payload
      state.loading = false
    },
  },
})

export const { setLoading, setError, setProducts } = producstSlice.actions
export default producstSlice.reducer

export const productsSelector = (state) => state.products
