import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col, Table } from 'antd'
import { filterData, onSelectAll, onSelectionChange, removeFilter, setPaging, setSorting } from 'store/slices/gridSlice'
import { hasProperties, spacesToProperty } from 'utils/general'
import { columnSearch } from './controls/columnSearch'
import { FilterTags } from './controls/filterTags'
import { SortHeader } from './controls/sortHeader'
import './dataTable.scss'

export const DataTable = ({
  state,
  loading,
  columns,
  getData,
  setDetail,
  selections,
  setDays,
  rightControls,
  defaultSearch,
  noFilter,
}) => {
  const dispatch = useDispatch()

  const [search, setSearch] = useState(defaultSearch)
  const [openDate, setOpenDate] = useState(true)
  const searchInput = useRef(null)

  useEffect(() => {
    if (!state.initialLoad) dispatch(getData())
    // eslint-disable-next-line
  }, [state.key])

  const updateSorting = (column, direction) => dispatch(setSorting({ column, direction }))

  const updatePaging = (currentPage, pageSize) => dispatch(setPaging({ currentPage, pageSize }))

  const filterTable = (property, value) => dispatch(filterData({ property, value }))

  const removeTag = (property, value) => dispatch(removeFilter({ property, value }))

  const getSearchColumn = (property, type, options, filter, noFilter) => {
    return columnSearch(
      searchInput,
      search,
      setSearch,
      property,
      type,
      filterTable,
      removeTag,
      options,
      filter,
      noFilter,
      openDate,
      setOpenDate,
      setDays
    )
  }

  const rowSelection = selections && {
    selectedRowKeys: state.selectedGridKeys,
    onChange: onSelectionChange,
    onSelectAll: (selected) => dispatch(onSelectAll(selected)),
    selections: selections.map((s) => {
      return {
        key: s.key,
        text: spacesToProperty(s.key),
        onSelect: async () => await s.onSelect(),
      }
    }),
  }

  const filterColumns = []
  columns.map((c) => {
    if (!c) return c
    return filterColumns.push({
      ...c,
      title: (
        <SortHeader
          property={c.dataIndex}
          filter={state.filters}
          update={updateSorting}
          title={c.title}
          noSort={c.noSort}
        />
      ),
      ...getSearchColumn(c.dataIndex, c.type, c.options, c.filter, c.noFilter),
    })
  })

  const gridFilters = state.filters
  const properties = hasProperties(gridFilters.config)
  const entries = Object.entries(gridFilters.config)
  const filtersTags = entries && <FilterTags entries={entries} removeTag={removeTag} />
  const pagination = {
    showSizeChanger: true,
    current: gridFilters.currentPage,
    pageSize: gridFilters.pageSize,
    total: state.total,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    onChange: (page, size) => updatePaging(page, size),
  }

  return (
    <>
      {!noFilter && (
        <Row className='filter-tags-container'>
          <Col flex={1}>
            {!loading && (
              <span className='fs-125 pr-100'>
                Viewing {state.data.length} Record{state.data.length > 1 || state.data.length === 0 ? 's' : ''}
              </span>
            )}
            {properties && filtersTags}
          </Col>
          {rightControls && <Col>{rightControls}</Col>}
        </Row>
      )}
      <Table
        className={`${state.tableClass} mt-150`}
        rowKey={state.rowKey}
        loading={loading}
        rowSelection={rowSelection}
        columns={filterColumns}
        dataSource={state.data}
        scroll={{ y: 1010 }}
        pagination={pagination}
        onRow={(row) => {
          return {
            onClick: (e) => setDetail && !e.target.href && setDetail(row),
          }
        }}
      />
    </>
  )
}
