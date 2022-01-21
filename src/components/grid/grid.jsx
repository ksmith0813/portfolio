import React from 'react'
import { CoolGrid } from 'components/_siteWide/grid/coolGrid'
import { sortAlphebetically } from 'utils/general'
import { useGridContext } from './context/gridContext'
import { GridContextProvider } from './context/gridContext'
import moment from 'moment'

export const Grid = () => {
  return (
    <GridContextProvider>
      <GridContents />
    </GridContextProvider>
  )
}

const GridContents = () => {
  const { loading, state, setState, getData } = useGridContext()

  const columns = [
    {
      title: 'Picture',
      dataIndex: 'Picture',
      noFilter: true,
      noSort: true,
      render: (value) => <img src={value} alt='' />,
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      type: 'text',
      noSort: true,
      sorter: (a, b) => sortAlphebetically(a, b, 'Name'),
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
      type: 'select',
      options: [{ value: 'male' }, { value: 'female' }],
      noSort: true,
      sorter: (a, b) => sortAlphebetically(a, b, 'Gender'),
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      type: 'text',
      noSort: true,
      sorter: (a, b) => sortAlphebetically(a, b, 'Email'),
    },
    {
      title: 'Phone',
      dataIndex: 'Phone',
      type: 'text',
      noSort: true,
    },
    {
      title: 'Register Date',
      dataIndex: 'RegisterDate',
      type: 'date',
      noFilter: true,
      noSort: true,
      render: (value) => moment(value).format('MM/DD/YYYY'),
    },
  ]

  const defaultSearch = {
    Name: '',
    Gender: '',
    Email: '',
    Phone: '',
  }

  return (
    <>
      <div className='p-300 pt-200'>
        <CoolGrid
          state={state}
          setState={setState}
          loading={loading}
          columns={columns}
          getData={getData}
          defaultSearch={defaultSearch}
          rowKey='RowId'
          storageKey='grid-filters'
          tableClass='grid-example'
        />
      </div>
    </>
  )
}
