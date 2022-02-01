import { createSlice } from '@reduxjs/toolkit'
import { hasProperties } from 'utils/general'
import moment from 'moment'

const store = window.localStorage

export const slice = createSlice({
  name: 'grid',
  initialState: {
    Key: 0,
    RowKey: '',
    ColumnKey: '',
    FilterKey: '',
    SelectAllKey: '',
    InitialLoad: true,
    Loading: true,
    OriginalData: [],
    Data: [],
    Total: 0,
    Filters: {
      CurrentPage: 1,
      PageSize: 50,
      SortColumn: '',
      SortDirection: '',
      Config: {},
      Options: {},
    },
    Search: {},
    SelectAll: false,
    SelectedIds: [],
    SelectedGridKeys: [],
    DefaultColumns: [],
    VisibleColumns: [],
    IgnoreColumns: ['Id'],
  },
  reducers: {
    setInitialLoad: (state) => {
      state.InitialLoad = false
    },
    setInitialData: (state, action) => {
      const payload = action.payload
      const defaults = payload.defaults
      state.RowKey = defaults.RowKey
      state.ColumnKey = defaults.ColumnKey
      state.FilterKey = defaults.FilterKey
      state.SelectAllKey = defaults.SelectAllKey
      state.TableClass = defaults.TableClass
      state.DefaultColumns = defaults.DefaultColumns
      state.VisibleColumns = defaults.VisibleColumns
      state.IgnoreColumns = defaults.IgnoreColumns
      state.Filters.Config = defaults.DefaultFilters

      let data = []
      let originalData = []

      payload.data.map((d, i) => {
        const location = d.location
        const add = () => {
          return {
            Id: i,
            Picture: d.picture.thumbnail,
            Name: `${d.name.first} ${d.name.last}`,
            UserName: d.login.username,
            Gender: d.gender,
            Country: location.country,
            State: location.state,
            City: location.city,
            PostalCode: location.postcode,
            Latitude: location.coordinates.latitude,
            Longitude: location.coordinates.longitude,
            Phone: d.phone,
            RegisterDate: d.registered?.date,
            DateOfBirth: d.dob.date,
            Age: d.dob.age,
          }
        }
        data.push(add())
        originalData.push(add())
        state.Loading = false
        return d
      })

      state.Data = data
      state.OriginalData = originalData
      updateData(state)
    },
    setData: (state) => {
      updateData(state)
    },
    updateDefaultColumns: (state, action) => {
      const columns = action.payload
      state.Key = ++state.Key
      state.VisibleColumns = columns
      store.setItem(state.ColumnKey, JSON.stringify(columns))
    },
    setSorting: (state, action) => {
      state.Key = ++state.Key
      state.Filters.SortColumn = action.payload.column
      state.Filters.SortDirection = action.payload.direction
    },
    setPaging: (state, action) => {
      state.Key = ++state.Key
      state.Filters.CurrentPage = action.payload.currentPage
      state.Filters.PageSize = action.payload.pageSize
    },
    filterData: (state, action) => {
      state.Key = ++state.Key
      state.Filters.CurrentPage = 1
      state.Filters.Config[action.payload.property] = action.payload.value
      store.setItem(state.FilterKey, JSON.stringify(state.Filters.Config))
    },
    removeFilter: (state, action) => {
      const property = action.payload.property
      const config = state.Filters.Config
      state.Key = ++state.Key
      state.Search[property] = ''
      delete config[property]
      store.setItem(state.FilterKey, JSON.stringify(config))
    },
    onSelectionChange: (state, action) => {
      const keys = action.payload.keys
      const rowKey = state.RowKey
      const selectAll = store.getItem(state.SelectAllKey)
      state.SelectAll = selectAll === 'true'
      state.SelectedGridKeys = keys

      if (selectAll) {
        const unselected = state.Data.filter((d) => !keys.includes(d[rowKey]))
        if (unselected.length) {
          const unselectedIds = unselected.map((u) => {
            return u[rowKey]
          })
          const unique = Array.from(new Set(unselectedIds))
          state.SelectedIds.push(...unique)
        }
      } else state.SelectedIds = keys
    },
    onSelectAll: (state, action) => {
      const selected = action.payload
      state.SelectAll = selected
      if (selected) store.setItem(state.SelectAllKey, selected.toString())
      else store.removeItem(state.SelectAllKey)
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

const updateData = (state) => {
  const config = state.Filters.Config

  if (hasProperties(config)) {
    let data = [...state.OriginalData]
    Object.entries(config).map((p) => {
      const property = p[0]
      const value = p[1]
      if (property === 'Gender') {
        data = data.filter((d) => d[property].toLowerCase().trim() === value.toLowerCase().trim())
      } else if (property === 'RegisterDate') {
        const dates = value.split(',')
        const start = dates[0]
        const end = dates[1]
        data = data.filter((d) => moment(d.RegisterDate) >= moment(start) && moment(d.RegisterDate) <= moment(end))
      } else {
        data = data.filter((d) => d[property] && d[property].toString().toLowerCase().trim().includes(value?.toLowerCase().trim()))
      }
      return p
    })

    state.Data = data
    state.Total = data.length
  } else {
    state.Data = state.OriginalData
    state.Total = state.OriginalData.length
  }
}
