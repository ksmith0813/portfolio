import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import caretUp from 'assets/caretUp.svg'
import caretDown from 'assets/caretDown.svg'
import { getState } from 'store/slices/themeSlice'
import { spacesToProperty } from 'utils/general'

export const SortHeader = ({ property, filter, update, title, noSort }) => {
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

const AntdSortingControls = ({ title, direction }) => {
  const state = useSelector(getState)
  const theme = state.selectedTheme
  const sortDirection = direction === 'desc' ? 'active' : ''
  return (
    <div className='ant-table-column-sorters'>
      <span className='ant-table-column-title'>{title}</span>
      <span className='ant-table-column-sorter ant-table-column-sorter-full'>
        <span className='ant-table-column-sorter-inner'>
          <span
            role='img'
            aria-label='caret-up'
            className={`anticon anticon-caret-up ant-table-column-sorter-up ${sortDirection} ${theme}`}
          >
            <img src={caretUp} alt='' />
          </span>
          <span
            role='img'
            aria-label='caret-down'
            className={`anticon anticon-caret-down ant-table-column-sorter-down ${sortDirection} ${theme}`}
          >
            <img src={caretDown} alt='' />
          </span>
        </span>
      </span>
    </div>
  )
}
