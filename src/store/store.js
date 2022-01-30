import { configureStore } from '@reduxjs/toolkit'
import shopReducer from './slices/shopSlice'
import registerReducer from './slices/registerSlice'
import listReducer from './slices/listSlice'

export default configureStore({
  reducer: {
    shop: shopReducer,
    register: registerReducer,
    list: listReducer
  },
})
