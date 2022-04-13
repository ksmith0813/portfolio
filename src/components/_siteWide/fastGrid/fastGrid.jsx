import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { AutoComplete, Input, Row, Col, Select, Table, DatePicker, Space, Button, Tag } from 'antd'
import { CalendarOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { hasProperties, spacesToProperty, getDateRanges, showMessage } from 'utils/general'
import { filterData, onSelectAll, onSelectionChange, removeFilter, setPaging, setSorting } from 'store/slices/gridSlice'
import caretUp from 'assets/caretUp.svg'
import caretDown from 'assets/caretDown.svg'
import moment from 'moment'
import './fastGrid.scss'

const { Option } = Select
const { RangePicker } = DatePicker

export const FastGrid = ({
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

const FilterTags = ({ entries, removeTag }) => {
  return (
    <>
      {entries.map((e, i) => {
        const property = e[0]
        let display = e[1]

        if (typeof display === 'boolean') display = display === true ? 'Yes' : 'No'

        return (
          <Tag
            className='mt-150'
            key={i}
            closable
            onClose={() => {
              removeTag(property)
            }}
          >
            {`${spacesToProperty(property.toUpperCase())}: ${display.toUpperCase()}`}
          </Tag>
        )
      })}
    </>
  )
}

const SortHeader = ({ property, filter, update, title, noSort }) => {
  const dispatch = useDispatch()
  const defaultProperty = property
  const display = title || spacesToProperty(property)

  if (noSort) return display

  const column = filter.sortColumn
  const direction = filter.sortDirection
  let nextSort = 'asc'
  let activeSort = ''

  if (column === defaultProperty) {
    const sort = direction === 'asc' ? 'desc' : 'asc'
    nextSort = sort
    activeSort = sort
  }

  return (
    <div onClick={() => dispatch(update({ column: defaultProperty, direction: nextSort }))}>
      <AntdSortingControls title={display} direction={activeSort} />
    </div>
  )
}

const AntdSortingControls = ({ title, direction }) => (
  <div className='ant-table-column-sorters'>
    <span className='ant-table-column-title'>{title}</span>
    <span className='ant-table-column-sorter ant-table-column-sorter-full'>
      <span className='ant-table-column-sorter-inner'>
        <span
          role='img'
          aria-label='caret-up'
          className={`anticon anticon-caret-up ant-table-column-sorter-up ${direction === 'desc' ? 'active' : ''}`}
        >
          <img src={caretUp} alt='' />
        </span>
        <span
          role='img'
          aria-label='caret-down'
          className={`anticon anticon-caret-down ant-table-column-sorter-down ${direction === 'asc' ? 'active' : ''}`}
        >
          <img src={caretDown} alt='' />
        </span>
      </span>
    </span>
  </div>
)

let currentDateFilter = false

const columnSearch = (
  searchInput,
  search,
  setSearch,
  property,
  type,
  onFilter,
  onRemove,
  options = [],
  filter,
  noFilter,
  openDate,
  setOpenDate,
  setDays
) => {
  if (noFilter) return null
  if (filter) return filter

  const handleSearch = (property, value, confirm) => {
    if (!value) {
      showMessage(`Please provide a ${spacesToProperty(property)}`)
      return
    }

    confirm()
    updateSearch(value)
    onFilter(property, value)
  }

  const updateSearch = (value) => {
    const copy = { ...search }
    copy[property] = value
    setSearch(copy)
  }

  const SearchControl = (type, confirm, handleSearch) => {
    const [foundOptions, setFoundOptions] = useState(options)
    const styleWidth = { width: 400 }
    let control

    const getTextControl = () => (
      <Input
        value={search[property]}
        ref={(node) => (searchInput.current = node)}
        placeholder='Search'
        style={styleWidth}
        onChange={(e) => updateSearch(e.target.value)}
        onPressEnter={(e) => handleSearch(property, e.target.value, confirm)}
      />
    )

    const getAutoCompleteControl = () => (
      <AutoComplete
        value={search[property]}
        ref={(node) => (searchInput.current = node)}
        placeholder='Search'
        style={styleWidth}
        options={foundOptions}
        onSelect={(v) => {
          updateSearch(v)
          handleSearch(property, v, confirm)
        }}
        onSearch={(v) => {
          if (v) {
            v = v.toLowerCase()
            const filteredOptions = options.filter((o) => o.value.toLowerCase().includes(v))
            setFoundOptions(filteredOptions)
          } else {
            setFoundOptions(options)
          }

          updateSearch(v)
        }}
      />
    )

    const getSelectControl = () => (
      <Select
        value={search[property]}
        ref={(node) => (searchInput.current = node)}
        style={styleWidth}
        onChange={(v) => {
          updateSearch(v)
          handleSearch(property, v, confirm)
        }}
      >
        {options.map((o, i) => (
          <Option key={i} value={o.value}>
            {o.value}
          </Option>
        ))}
      </Select>
    )

    const getRangeControl = () => {
      let value = search[property]
      value = value && value.length ? value.split(',') : ''
      value = value ? [moment(value[0], moment[1])] : ''

      return (
        <RangePicker
          value={value}
          ref={(node) => (searchInput.current = node)}
          format='MM/DD/YYYY'
          allowClear={false}
          open={openDate}
          onChange={(date, dateString) => {
            const value = dateString.join(', ')
            handleSearch(property, value, confirm)
            setOpenDate(false)
          }}
          ranges={getDateRanges()}
        />
      )
    }

    switch (type) {
      case 'select':
        currentDateFilter = false
        control = getSelectControl()
        break
      case 'autoComplete':
        currentDateFilter = false
        control = getAutoCompleteControl()
        break
      case 'date':
        currentDateFilter = true
        control = getRangeControl()
        break
      default:
        currentDateFilter = false
        control = getTextControl()
        break
    }

    return control
  }

  return {
    filterDropdown: ({ confirm, clearFilters }) => (
      <div className='p-050'>
        <Space className='mr-050'>{SearchControl(type, confirm, handleSearch)}</Space>
        <Space>
          <Button
            type='primary'
            size='small'
            icon={<SearchOutlined />}
            onClick={() => handleSearch(property, search[property], confirm)}
          />
          <Button
            size='small'
            icon={<CloseOutlined />}
            onClick={() => {
              clearFilters()
              const copy = { ...search }
              copy[property] = ''
              setSearch(copy)
              onRemove(property)
              setDays(undefined)
            }}
          />
        </Space>
      </div>
    ),
    filterIcon: () => {
      if (type === 'date') return <CalendarOutlined className='fs-125' />
      return <SearchOutlined className='fs-125' />
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          if (currentDateFilter) setOpenDate(true)
          searchInput.current?.focus()
        }, 100)
      } else if (currentDateFilter) setOpenDate(false)
    },
  }
}
