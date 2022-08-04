import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'tree',
  initialState: {
    search: '',
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload
    },
  },
})

export const { setSearch } = slice.actions

export const getState = (state) => state.tree

export default slice.reducer
