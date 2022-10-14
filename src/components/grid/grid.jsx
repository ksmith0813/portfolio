import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findWhere } from 'underscore'
import { DataTable } from 'components/_siteWide/dataTable/dataTable'
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
    'picture',
    'name',
    'gender',
    'country',
    'state',
    'city',
    'postalCode',
    'phone',
    'registerDate',
  ]

  const defaults = {
    rowKey: 'id',
    columnKey: 'user-grid-columns',
    filterKey: 'user-grid-filters',
    selectAllKey: 'user-grid-select-all',
    tableClass: 'user-grid',
    defaultFilters: defaultFilters,
    defaultColumns: defaultColumns,
    visibleColumns: storageColumns || defaultColumns,
    ignoreColumns: ['id'],
  }

  useEffect(() => {
    const params = qs.stringify({
      results: 200,
      page: state.filters.currentPage,
    })

    const getInitialData = async () => {
      dispatch(setInitialLoad(false))
      if (state.initialLoad) {
        const { data } = await api.getUsers(params)
        dispatch(setInitialData({ data: data.results, defaults }))
      }
    }

    getInitialData()
    // eslint-disable-next-line
  }, [])

  let columns = []
  let allColumns = getColumns()
  let visibleColumns = allColumns.filter((c) => state.visibleColumns.includes(c.dataIndex))
  const storedColumnList = JSON.parse(store.getItem(defaults.columnKey))

  if (storedColumnList) {
    storedColumnList.map((s) => {
      const match = findWhere(allColumns, { dataIndex: s })
      columns.push(match)
      return s
    })
  } else {
    columns = visibleColumns
  }

  return (
    <div className='p-200'>
      <DataTable
        state={state}
        loading={state.loading}
        getData={setData}
        columns={columns}
        rightControls={<GridControls />}
        defaultSearch={state.search}
      />
    </div>
  )
}
