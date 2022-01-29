import { configureStore } from '@reduxjs/toolkit'
import shopReducer from './slices/shopSlice'
import registerReducer from './slices/registerSlice'

export default configureStore({
  reducer: {
    shop: shopReducer,
    register: registerReducer,
  },
})
