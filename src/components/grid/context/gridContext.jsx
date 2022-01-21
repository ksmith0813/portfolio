import React, { useState, useContext, createContext } from 'react'
import { hasProperties, sortAlphebetically } from 'utils/general'
import api from 'utils/api'
import moment from 'moment'
import qs from 'qs'
import Avatar from 'antd/lib/avatar/avatar'

const GridContext = createContext(null)
const store = window.localStorage

export const GridContextProvider = ({ children }) => {
  const storageFilters = store.getItem('grid-filters')
  const storageColumns = store.getItem('grid-columns')
  const defaultColumns = [
    'Thumbnail',
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
  const [user, setUser] = useState()
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
    IgnoreColumns: ['Id', 'Picture'],
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
          Thumbnail: d.picture.thumbnail,
          Picture: d.picture.large,
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

  const columns = [
    {
      title: 'Picture',
      dataIndex: 'Thumbnail',
      noFilter: true,
      noSort: true,
      width: 80,
      render: (value) => <Avatar src={value} />,
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      type: 'text',
      width: 150,
      noSort: true,
      sorter: (a, b) => sortAlphebetically(a, b, 'Name'),
      render: (value) => <b>{value}</b>,
    },
    {
      title: 'Register Date',
      dataIndex: 'RegisterDate',
      type: 'date',
      width: 200,
      noSort: true,
      render: (value) => moment(value).format('MM/DD/YYYY'),
      sorter: (a, b) => moment(a.RegisterDate) - moment(b.RegisterDate),
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      type: 'text',
      width: 250,
      noSort: true,
      sorter: (a, b) => sortAlphebetically(a, b, 'Email'),
      render: (value) => <a href={`mailto:${value}`}>{value}</a>,
    },
    {
      title: 'Phone',
      dataIndex: 'Phone',
      type: 'text',
      width: 150,
      noSort: true,
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
      type: 'select',
      width: 100,
      options: [{ value: 'male' }, { value: 'female' }],
      noSort: true,
      sorter: (a, b) => sortAlphebetically(a, b, 'Gender'),
    },
    {
      title: 'Country',
      dataIndex: 'Country',
      type: 'text',
      width: 150,
      noSort: true,
      sorter: (a, b) => sortAlphebetically(a, b, 'Country'),
    },
    {
      title: 'State',
      dataIndex: 'State',
      type: 'text',
      width: 200,
      noSort: true,
      sorter: (a, b) => sortAlphebetically(a, b, 'State'),
    },
    {
      title: 'City',
      dataIndex: 'City',
      type: 'text',
      width: 200,
      noSort: true,
      sorter: (a, b) => sortAlphebetically(a, b, 'City'),
    },
    {
      title: 'PostalCode',
      dataIndex: 'PostalCode',
      type: 'text',
      width: 100,
      noSort: true,
      sorter: (a, b) => a.PostalCode - b.PostalCode,
    },
  ]

  return (
    <GridContext.Provider value={{ initialLoad, loading, state, setState, user, getData, setUser, columns }}>
      {children}
    </GridContext.Provider>
  )
}

export const useGridContext = () => {
  const context = useContext(GridContext)
  if (!context) throw new Error('Context must used within a provider')
  return context
}
