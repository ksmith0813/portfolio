import React, { useState } from 'react'
import moment from 'moment'
import { AutoComplete, Input, Select, Space, Button, DatePicker } from 'antd'
import { CalendarOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { spacesToProperty, getDateRanges, showMessage } from 'utils/general'

let currentDateFilter = false
const { Option } = Select
const { RangePicker } = DatePicker

export const columnSearch = (
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
