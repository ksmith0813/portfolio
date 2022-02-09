import { createSlice } from '@reduxjs/toolkit'
import { exercises } from 'constants/exercises'

export const slice = createSlice({
  name: 'menu',
  initialState: {
    search: '',
    searchCategories: [],
    data: [],
    originalData: [],
    selectedId: '',
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
        const searchCategories = []

        if (muscleGroupMatches.length) searchCategories.push('Muscle')
        if (equipmentMatches.length) searchCategories.push('Equipment')
        if (movementMatches.length) searchCategories.push('Movement')

        state.searchCategories = searchCategories.length ? searchCategories : []
        state.data = [
          ...new Set(nameMatches.concat(muscleGroupMatches).concat(equipmentMatches).concat(movementMatches)),
        ]
      } else {
        state.data = exercises
        state.originalData = exercises
      }
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload
    },
    setSelectedItemByName: (state, action) => {
      state.selectedItem = state.originalData.filter((d) => d.name?.toLowerCase() === action.payload?.toLowerCase())[0]
    },
  },
})

export const { setSearch, setData, setSelectedId, setSelectedItem, setSelectedItemByName } = slice.actions

export const getState = (state) => state.menu

export default slice.reducer

const getMatchesByProperty = (state, property, payload) => {
  return state.originalData.filter((d) => d[property]?.toLowerCase().includes(payload?.toLowerCase()))
}
