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

export default slice.reducer
