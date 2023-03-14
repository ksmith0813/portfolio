import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'weather',
  initialState: {
    loading: false,
    search: '',
    weather: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setWeather: (state, action) => {
      state.weather = action.payload
    },
  },
})

export const { setLoading, setSearch, setWeather } = slice.actions

export default slice.reducer
