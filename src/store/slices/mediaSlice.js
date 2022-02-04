import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'media',
  initialState: {
    loading: false,
    search: '',
    data: [],
    selectedId: '',
    selectedMedia: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setData: (state, action) => {
      state.data = action.payload
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload
    },
    setSelectedMedia: (state, action) => {
      state.selectedMedia = action.payload
    },
  },
})

export const { setLoading, setSearch, setData, setSelectedId, setSelectedMedia} = slice.actions

export const getState = (state) => state.media

export default slice.reducer
