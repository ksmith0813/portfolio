import { createSlice } from '@reduxjs/toolkit'
import { findWhere } from 'underscore'

export const slice = createSlice({
  name: 'shop',
  initialState: {
    loadingProducts: true,
    showingCartModal: false,
    selectedCategory: 'ALL',
    categories: [],
    products: [],
    cartItems: [],
  },
  reducers: {
    loading: (state) => {
      state.loadingProducts = true
    },
    setCategories: (state, action) => {
      state.categories = ['ALL'].concat(action.payload)
    },
    setProducts: (state, action) => {
      state.products = action.payload?.sort((a, b) => (a.title > b.title ? 1 : -1))
      state.loadingProducts = false
    },
    changeCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    updateCart: (state, action) => {
      const match = findWhere([...state.cartItems], { id: action.payload.id })
      if (match) match.qty += action.payload.qty
      else state.cartItems.push(action.payload)
    },
    removeProduct: (state, action) => {
      state.cartItems = state.cartItems.filter((c) => c.id !== action.payload.id)
    },
    openModal: (state) => {
      state.showingCartModal = true
    },
    closeModal: (state) => {
      state.showingCartModal = false
    },
  },
})

export const { loading, setCategories, setProducts, changeCategory, updateCart, removeProduct, openModal, closeModal } =
  slice.actions

export const getState = (state) => state.shop

export default slice.reducer
