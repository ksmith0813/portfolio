import { createSlice } from '@reduxjs/toolkit'
import { videos } from 'constants/videos'

export const slice = createSlice({
  name: 'video',
  initialState: {
    search: '',
    categories: [],
    data: [],
    originalData: [],
    selectedItem: null,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setData: (state, action) => {
      if (action.payload) {
        const nameMatches = getMatchesByProperty(state, 'name', action.payload)
        const muscleGroupMatches = getMatchesByProperty(state, 'muscle_groups', action.payload)
        const equipmentMatches = getMatchesByProperty(state, 'equipment_required', action.payload)
        const movementMatches = getMatchesByProperty(state, 'movement_patterns', action.payload)
        const categories = []

        if (muscleGroupMatches.length) categories.push('Muscle')
        if (equipmentMatches.length) categories.push('Equipment')
        if (movementMatches.length) categories.push('Movement')

        state.categories = categories.length ? categories : []
        state.data = [...new Set(nameMatches.concat(muscleGroupMatches, equipmentMatches, movementMatches))]
      } else {
        state.data = videos
      }

      if (!state.originalData.length) state.originalData = videos
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload
    },
    setSelectedItemByName: (state, action) => {
      state.selectedItem = state.originalData.filter((d) => d.name?.toLowerCase() === action.payload?.toLowerCase())[0]
    },
  },
})

export const { setSearch, setData, setSelectedItem, setSelectedItemByName } = slice.actions

export const getState = (state) => state.video

export default slice.reducer

const getMatchesByProperty = (state, property, payload) => {
  return state.originalData.filter((d) => d[property]?.toLowerCase().includes(payload?.toLowerCase()))
}
