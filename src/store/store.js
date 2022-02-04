import { configureStore } from '@reduxjs/toolkit'
import registerReducer from './slices/registerSlice'
import gridReducer from './slices/gridSlice'
import listReducer from './slices/listSlice'
import mediaReducer from './slices/mediaSlice'
import weatherReducer from './slices/weatherSlice'
import shopReducer from './slices/shopSlice'

export default configureStore({
  reducer: {
    register: registerReducer,
    grid: gridReducer,
    list: listReducer,
    media: mediaReducer,
    weather: weatherReducer,
    shop: shopReducer,
  },
})
