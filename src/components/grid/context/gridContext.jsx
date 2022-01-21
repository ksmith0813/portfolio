import React, { useState, useContext, createContext } from 'react'
import { hasProperties } from 'utils/general'
import api from 'utils/api'
import qs from 'qs'

const GridContext = createContext(null)
const defaultColumns = ['Picture', 'Name', 'Gender', 'Email', 'Phone', 'RegisterDate']
const store = window.localStorage

export const GridContextProvider = ({ children }) => {
  const storageFilters = store.getItem('grid-filters')
  const storageColumns = store.getItem('grid-columns')
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
    VisibleColumns: storageColumns ? JSON.parse(storageColumns) : defaultColumns,
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
      // eslint-disable-next-line
      Object.entries(config).map((p) => {
        const property = p[0]
        const value = p[1]
        if (property === 'Gender') {
          filteredData = filteredData.filter((d) => d[property].toLowerCase().trim() === value.toLowerCase().trim())
        } else {
          filteredData = filteredData.filter((d) =>
            d[property].toLowerCase().trim().includes(value.toLowerCase().trim())
          )
        }
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

      // eslint-disable-next-line
      results.map((d, i) => {
        transforms.push({
          RowId: i,
          Picture: d.picture.thumbnail,
          Name: `${d.name.first} ${d.name.last}`,
          Gender: d.gender,
          Email: d.email,
          Phone: d.phone,
          RegisterDate: d.registered?.date,
        })
      })

      copy.OriginalData = transforms
    })

    return copy
  }

  const setDetail = () => {
    // todo
  }

  return (
    <GridContext.Provider value={{ initialLoad, loading, state, setState, getData, setDetail }}>
      {children}
    </GridContext.Provider>
  )
}

export const useGridContext = () => {
  const context = useContext(GridContext)
  if (!context) throw new Error('Context must used within a provider')
  return context
}
