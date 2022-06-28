import { createSlice } from '@reduxjs/toolkit'
import { hasProperties } from 'utils/general'
import moment from 'moment'

const store = window.localStorage

const initialState = {
  initialLoad: true,
  loading: true,
  key: 0,
  rowKey: '',
  columnKey: '',
  filterKey: '',
  selectAllKey: '',
  selectAll: false,
  selectedIds: [],
  selectedGridKeys: [],
  originalData: [],
  data: [],
  total: 0,
  filters: {
    currentPage: 1,
    pageSize: 50,
    sortColumn: '',
    sortDirection: '',
    config: {},
    options: {},
  },
  search: {},
  defaultColumns: [],
  visibleColumns: [],
  ignoreColumns: ['Id'],
}

export const slice = createSlice({
  name: 'grid',
  initialState: initialState,
  reducers: {
    setInitialLoad: (state) => {
      state.initialLoad = false
    },
    setInitialData: (state, action) => {
      initializeData(state, action)
    },
    setData: (state) => {
      updateData(state)
    },
    updateDefaultColumns: (state, action) => {
      const columns = action.payload
      state.key = ++state.key
      state.visibleColumns = columns
      store.setItem(state.columnKey, JSON.stringify(columns))
    },
    setSorting: (state, action) => {
      state.key = ++state.key
      state.filters.sortColumn = action.payload.column
      state.filters.sortDirection = action.payload.direction
    },
    setPaging: (state, action) => {
      state.key = ++state.key
      state.filters.currentPage = action.payload.currentPage
      state.filters.pageSize = action.payload.pageSize
    },
    filterData: (state, action) => {
      state.key = ++state.key
      state.filters.currentPage = 1
      state.filters.config[action.payload.property] = action.payload.value
      store.setItem(state.filterKey, JSON.stringify(state.filters.config))
    },
    removeFilter: (state, action) => {
      const property = action.payload.property
      const config = state.filters.config
      state.key = ++state.key
      state.search[property] = ''
      delete config[property]
      store.setItem(state.filterKey, JSON.stringify(config))
    },
    onSelectionChange: (state, action) => {
      const keys = action.payload.keys
      const rowKey = state.rowKey
      const selectAll = store.getItem(state.selectAllKey)
      state.selectAll = selectAll === 'true'
      state.selectedGridKeys = keys

      if (selectAll) {
        const unselected = state.Data.filter((d) => !keys.includes(d[rowKey]))
        if (unselected.length) {
          const unselectedIds = unselected.map((u) => {
            return u[rowKey]
          })
          const unique = Array.from(new Set(unselectedIds))
          state.selectedIds.push(...unique)
        }
      } else state.selectedIds = keys
    },
    onSelectAll: (state, action) => {
      const selected = action.payload
      state.selectAll = selected
      if (selected) store.setItem(state.selectAllKey, selected.toString())
      else store.removeItem(state.selectAllKey)
    },
  },
})

export const {
  loading,
  setInitialLoad,
  setInitialData,
  setData,
  updateDefaultColumns,
  getGridColumns,
  setSorting,
  setPaging,
  filterData,
  removeFilter,
  onSelectionChange,
  onSelectAll,
} = slice.actions

export const getState = (state) => state.grid

export default slice.reducer

const initializeData = (state, action) => {
  const payload = action.payload
  const defaults = payload.defaults
  state.rowKey = defaults.rowKey
  state.columnKey = defaults.columnKey
  state.filterKey = defaults.filterKey
  state.selectAllKey = defaults.selectAllKey
  state.tableClass = defaults.tableClass
  state.defaultColumns = defaults.defaultColumns
  state.visibleColumns = defaults.visibleColumns
  state.ignoreColumns = defaults.ignoreColumns
  state.filters.config = defaults.defaultFilters

  let data = []
  let originalData = []

  payload.data.map((d, i) => {
    const location = d.location
    const add = () => {
      return {
        id: i,
        picture: d.picture.thumbnail,
        name: `${d.name.first} ${d.name.last}`,
        userName: d.login.username,
        country: location.country,
        state: location.state,
        city: location.city,
        postalCode: location.postcode,
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
        phone: d.phone,
        registerDate: d.registered?.date,
        dateOfBirth: d.dob.date,
        age: d.dob.age,
      }
    }
    data.push(add())
    originalData.push(add())
    state.loading = false
    return d
  })

  state.data = data
  state.originalData = originalData
  updateData(state)
}

const updateData = (state) => {
  const config = state.filters.config

  if (hasProperties(config)) {
    let data = [...state.originalData]
    Object.entries(config).map((p) => {
      const property = p[0]
      const value = p[1]
      if (property === 'Gender') {
        data = data.filter((d) => d[property].toLowerCase().trim() === value.toLowerCase().trim())
      } else if (property === 'registerDate') {
        const dates = value.split(',')
        const start = dates[0]
        const end = dates[1]
        data = data.filter((d) => moment(d.registerDate) >= moment(start) && moment(d.registerDate) <= moment(end))
      } else {
        data = data.filter(
          (d) => d[property] && d[property].toString().toLowerCase().trim().includes(value?.toLowerCase().trim())
        )
      }
      return p
    })

    state.data = data
    state.total = data.length
  } else {
    state.data = state.originalData
    state.total = state.originalData.length
  }
}
