import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/themeSlice'
import registerReducer from './slices/registerSlice'
import gridReducer from './slices/gridSlice'
import videoReducer from './slices/videoSlice'
import listReducer from './slices/listSlice'
import mediaReducer from './slices/mediaSlice'
import weatherReducer from './slices/weatherSlice'
import shopReducer from './slices/shopSlice'

export default configureStore({
  reducer: {
    theme: themeReducer,
    register: registerReducer,
    grid: gridReducer,
    video: videoReducer,
    list: listReducer,
    media: mediaReducer,
    weather: weatherReducer,
    shop: shopReducer,
  },
})
