import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FastGrid } from 'components/_siteWide/fastGrid/fastGrid'
import { getState, setInitialLoad, setInitialData, setData } from 'store/slices/gridSlice'
import api from 'utils/api'
import { getColumns } from './columns/gridColumns'
import { GridControls } from './controls/gridControls'
import qs from 'qs'
import './grid.scss'

const store = window.localStorage

export const Grid = () => {
  const state = useSelector(getState)
  const dispatch = useDispatch()

  const defaultFilters = JSON.parse(store.getItem('user-grid-filters')) || {}
  const storageColumns = JSON.parse(store.getItem('grid-columns'))
  const defaultColumns = [
    'Picture',
    'Name',
    'Gender',
    'Country',
    'State',
    'City',
    'PostalCode',
    'Phone',
    'RegisterDate',
  ]

  const defaults = {
    RowKey: 'Id',
    ColumnKey: 'user-grid-columns',
    FilterKey: 'user-grid-filters',
    SelectAllKey: 'user-grid-select-all',
    TableClass: 'user-grid',
    DefaultFilters: defaultFilters,
    DefaultColumns: ['Picture', 'Name', 'Gender', 'Country', 'State', 'City', 'PostalCode', 'Phone', 'RegisterDate'],
    VisibleColumns: storageColumns || defaultColumns,
    IgnoreColumns: ['Id'],
  }

  useEffect(() => {
    const params = qs.stringify({
      results: 200,
      page: state.Filters.CurrentPage,
    })

    const getInitialData = async () => {
      dispatch(setInitialLoad(false))
      if (state.InitialLoad) {
        const { data } = await api.getUsers(params)
        dispatch(setInitialData({ data: data.results, defaults }))
      }
    }

    getInitialData()
    // eslint-disable-next-line
  }, [])

  let columns = []
  let allColumns = getColumns()
  let visibleColumns = allColumns.filter((c) => state.VisibleColumns.includes(c.dataIndex))
  const storedColumnList = JSON.parse(store.getItem(defaults.ColumnKey))

  if (storedColumnList) {
    storedColumnList.map((s) => {
      const match = allColumns.filter((c) => c.dataIndex === s)[0]
      columns.push(match)
      return s
    })
  } else {
    columns = visibleColumns
  }

  return (
    <div className='p-200'>
      <FastGrid
        state={state}
        loading={state.Loading}
        getData={setData}
        columns={columns}
        rightControls={<GridControls />}
        defaultSearch={state.Search}
      />
    </div>
  )
}
