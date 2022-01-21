import React, { useState, useContext, createContext } from 'react'
import { hasProperties } from 'utils/general'
import api from 'utils/api'
import moment from 'moment'
import qs from 'qs'
import { getColumns } from '../columns/gridColumns'

const GridContext = createContext(null)
const store = window.localStorage

export const GridContextProvider = ({ children }) => {
  const storageFilters = store.getItem('grid-filters')
  const storageColumns = store.getItem('grid-columns')
  const defaultColumns = [
    'Picture',
    'Name',
    'RegisterDate',
    'Email',
    'Phone',
    'Gender',
    'Country',
    'State',
    'City',
    'PostalCode',
  ]
  const [initialLoad, setInitialLoad] = useState(true)
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({
    Key: 0,
    OriginalData: [],
    Data: [],
    Total: 0,
    Filters: {
      CurrentPage: 1,
      PageSize: 50,
      SortColumn: '',
      SortDirection: '',
      Search: '',
      Config: storageFilters ? JSON.parse(storageFilters) : {},
      Options: {},
    },
    SelectAll: false,
    SelectedIds: [],
    SelectedGridKeys: [],
    DefaultColumns: defaultColumns,
    VisibleColumns: storageColumns ? JSON.parse(storageColumns) : defaultColumns,
    IgnoreColumns: ['Id'],
  })

  const getData = async () => {
    setLoading(true)
    let copy = { ...state }
    const config = copy.Filters.Config

    if (initialLoad) {
      copy = await getInitialData(copy)
      setInitialLoad(false)
    }

    if (hasProperties(config)) {
      let filteredData = copy.OriginalData
      Object.entries(config).map((p) => {
        const property = p[0]
        const value = p[1]
        if (property === 'Gender') {
          filteredData = filteredData.filter((d) => d[property].toLowerCase().trim() === value.toLowerCase().trim())
        } else if (property === 'RegisterDate') {
          const dates = value.split(',')
          const start = dates[0]
          const end = dates[1]
          filteredData = filteredData.filter(
            (d) => moment(d.RegisterDate) >= moment(start) && moment(d.RegisterDate) <= moment(end)
          )
        } else {
          filteredData = filteredData.filter((d) =>
            d[property].toLowerCase().trim().includes(value.toLowerCase().trim())
          )
        }

        return p
      })

      copy.Data = filteredData
      copy.Total = filteredData.length
    } else {
      copy.Data = copy.OriginalData
      copy.Total = copy.OriginalData.length
    }

    setState(copy)
    setLoading(false)
  }

  const getInitialData = async (copy) => {
    const params = qs.stringify({
      results: 200,
      page: state.Filters.CurrentPage,
    })

    await api.getUsers(params).then(({ data }) => {
      const results = data.results
      copy.Data = results
      const transforms = []
      results.map((d, i) => {
        const location = d.location
        transforms.push({
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
          Email: d.email,
          Phone: d.phone,
          RegisterDate: d.registered?.date,
          DateOfBirth: d.dob.date,
          Age: d.dob.age,
        })

        return d
      })

      copy.OriginalData = transforms
    })

    return copy
  }

  const getColummSelectionList = () => {
    let columnList = []
    Object.keys(state.OriginalData[0]).map((p, i) => {
      if (state.IgnoreColumns.includes(p)) return p
      columnList.push({
        id: i,
        property: p,
        show: state.VisibleColumns.includes(p),
      })

      return p
    })

    return columnList
  }

  const getGridColumns = () => {
    let columns = getColumns()
    let visibleColumns = columns.filter((c) => state.VisibleColumns.includes(c.dataIndex))
    let orderedColumns = []
    const storedColumnList = JSON.parse(store.getItem('grid-columns'))

    if (storedColumnList) {
      storedColumnList.map((s) => {
        const match = visibleColumns.filter((c) => c.dataIndex === s)[0]
        orderedColumns.push(match)
        return s
      })
    } else {
      orderedColumns = visibleColumns
    }

    return orderedColumns
  }

  return (
    <GridContext.Provider
      value={{
        // state
        initialLoad,
        loading,
        state,
        setState,

        // functions
        getData,
        getGridColumns,
        getColummSelectionList,
      }}
    >
      {children}
    </GridContext.Provider>
  )
}

export const useGridContext = () => {
  const context = useContext(GridContext)
  if (!context) throw new Error('Context must used within a provider')
  return context
}
