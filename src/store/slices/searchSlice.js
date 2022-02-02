import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'search',
  initialState: {
    loading: false,
    search: '',
    movies: [],
    selectedTitle: '',
    selectedMovie: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setMovies: (state, action) => {
      state.movies = action.payload
    },
    setSelectedTitle: (state, action) => {
      state.selectedTitle = action.payload
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload
    },
  },
})

export const { setLoading, setSearch, setMovies, setSelectedTitle, setSelectedMovie } = slice.actions

export const getState = (state) => state.search

export default slice.reducer
