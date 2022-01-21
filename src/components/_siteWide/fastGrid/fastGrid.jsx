import React, { useState, useEffect, useRef } from 'react'
import { AutoComplete, Input, Row, Select, Table, DatePicker, Space, Button, Tag } from 'antd'
import { CalendarOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { hasProperties, spacesToProperty, getDateRanges, showMessage } from 'utils/general'
import moment from 'moment'
import './fastGrid.scss'

const { Option } = Select
const { RangePicker } = DatePicker
const store = window.localStorage

export const FastGrid = ({
  state,
  setState,
  defaultSearch = {},
  loading,
  columns,
  getData,
  setDetail,
  rowKey,
  storageKey,
  tableClass,
  selections,
  setDays,
  toolbar,
  noFilter,
}) => {
  const [search, setSearch] = useState(defaultSearch)
  const [openDate, setOpenDate] = useState(true)
  const searchInput = useRef(null)

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [state.Key])

  const updateSorting = (column, direction) => {
    const copy = { ...state }
    copy.Key = ++copy.Key
    copy.Filters.SortColumn = column
    copy.Filters.SortDirection = direction
    setState(copy)
  }

  const updatePaging = (currentPage, pageSize) => {
    const copy = { ...state }
    copy.Key = ++copy.Key
    copy.Filters.CurrentPage = currentPage
    copy.Filters.PageSize = pageSize
    setState(copy)
  }

  const filterTable = (property, value) => {
    const copy = { ...state }
    copy.Key = ++copy.Key
    copy.Filters.CurrentPage = 1
    copy.Filters.Config[property] = value
    store.setItem(storageKey, JSON.stringify(copy.Filters.Config))
    setState(copy)
  }

  const removeFilter = (property) => {
    const copy = { ...state }
    copy.Key = ++copy.Key
    delete copy.Filters.Config[property]
    store.setItem(storageKey, JSON.stringify(copy.Filters.Config))
    setState(copy)
  }

  const removeTag = (property) => {
    const copy = { ...search }
    copy[property] = ''
    setSearch(copy)
    removeFilter(property)
  }

  const onSelectChange = (keys) => {
    const selectAll = store.getItem('grid-filter-select-all')
    const copy = { ...state }
    copy.SelectAll = selectAll === 'true'
    copy.SelectedGridKeys = keys

    if (selectAll) {
      const unselected = copy.Data.filter((d) => !keys.includes(d[rowKey]))
      if (unselected.length) {
        const unselectedIds = unselected.map((u) => {
          return u[rowKey]
        })
        const unique = Array.from(new Set(unselectedIds))
        copy.SelectedIds.push(...unique)
      }
    } else copy.SelectedIds = keys

    setState(copy)
  }

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
    selectedRowKeys: state.SelectedGridKeys,
    onChange: onSelectChange,
    onSelectAll: (selected) => {
      const copy = { ...state }
      copy.SelectAll = selected
      setState(copy)
      if (selected) store.setItem('grid-filter-select-all', selected.toString())
      else store.removeItem('grid-filter-select-all')
    },
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
    return filterColumns.push({
      ...c,
      title: (
        <SortHeader
          property={c.dataIndex}
          filter={state.Filters}
          update={updateSorting}
          title={c.title}
          noSort={c.noSort}
        />
      ),
      ...getSearchColumn(c.dataIndex, c.type, c.options, c.filter, c.noFilter),
    })
  })

  const gridFilters = state.Filters
  const properties = hasProperties(gridFilters.Config)
  const entries = Object.entries(gridFilters.Config)
  const filtersTags = entries && <FilterTags entries={entries} removeTag={removeTag} />
  const pagination = {
    showSizeChanger: true,
    current: gridFilters.CurrentPage,
    pageSize: gridFilters.PageSize,
    total: state.Total,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    onChange: (page, size) => updatePaging(page, size),
  }

  return (
    <>
      {!noFilter && (
        <Row className='filter-tags-container'>
          {properties && filtersTags}
          {!properties && <b className='fs-125'>Currently viewing all users</b>}
        </Row>
      )}
      {toolbar}
      <Table
        className={`${tableClass} mt-150`}
        rowKey={rowKey}
        loading={loading}
        rowSelection={rowSelection}
        columns={filterColumns}
        dataSource={state.Data}
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
            color='blue'
            key={i}
            closable
            onClose={() => {
              removeTag(property)
            }}
          >
            {`${spacesToProperty(property)}: ${display}`}
          </Tag>
        )
      })}
    </>
  )
}

const SortHeader = ({ property, filter, update, title, noSort }) => {
  const defaultProperty = property
  const display = title || spacesToProperty(property)

  if (noSort) return display

  const column = filter.SortColumn
  const direction = filter.SortDirection
  let nextSort = 'asc'
  let activeSort = ''

  if (column === defaultProperty) {
    const sort = direction === 'asc' ? 'desc' : 'asc'
    nextSort = sort
    activeSort = sort
  }

  return (
    <div onClick={() => update(defaultProperty, nextSort)}>
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
          <svg
            viewBox='0 0 1024 1024'
            focusable='false'
            data-icon='caret-up'
            width='1em'
            height='1em'
            fill='currentColor'
            aria-hidden='true'
          >
            <path d='M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z' />
          </svg>
        </span>
        <span
          role='img'
          aria-label='caret-down'
          className={`anticon anticon-caret-down ant-table-column-sorter-down ${direction === 'asc' ? 'active' : ''}`}
        >
          <svg
            viewBox='0 0 1024 1024'
            focusable='false'
            data-icon='caret-down'
            width='1em'
            height='1em'
            fill='currentColor'
            aria-hidden='true'
          >
            <path d='M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z' />
          </svg>
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
