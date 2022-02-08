import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'theme',
  initialState: {
    selectedTheme: 'default',
  },
  reducers: {
    setSelectedTheme: (state, action) => {
      state.selectedTheme = action.payload
    },
  },
})

export const { setSelectedTheme } = slice.actions

export const getState = (state) => state.theme

export default slice.reducer
