import React from 'react'
import { FastGrid } from 'components/_siteWide/fastGrid/fastGrid'
import { useGridContext } from './context/gridContext'
import { GridContextProvider } from './context/gridContext'
import { User } from './user/user'
import { GridControls } from './controls/gridControls'
import './grid.scss'

export const Grid = () => {
  return (
    <GridContextProvider>
      <GridContents />
    </GridContextProvider>
  )
}

const GridContents = () => {
  const { loading, state, setState, user, setUser, getData, columns, defaultSearch } = useGridContext()

  if (user) return <User />

  return (
    <>
      <div className='page'>
        <FastGrid
          state={state}
          setState={setState}
          loading={loading}
          columns={columns.filter((c) => state.VisibleColumns.includes(c.dataIndex))}
          getData={getData}
          setDetail={setUser}
          defaultSearch={defaultSearch}
          rightControls={<GridControls />}
          rowKey='Id'
          storageKey='grid-filters'
          tableClass='user-grid'
        />
      </div>
    </>
  )
}
