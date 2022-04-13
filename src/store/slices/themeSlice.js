import { createSlice } from '@reduxjs/toolkit'

const store = window.localStorage;

export const slice = createSlice({
  name: 'theme',
  initialState: {
    selectedTheme: store.getItem('theme') || 'default',
  },
  reducers: {
    setSelectedTheme: (state, action) => {
      state.selectedTheme = action.payload
      store.setItem('theme', action.payload);
    },
  },
})

export const { setSelectedTheme } = slice.actions

export const getState = (state) => state.theme

export default slice.reducer
