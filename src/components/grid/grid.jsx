import React from 'react'
import { FastGrid } from 'components/_siteWide/fastGrid/fastGrid'
import { useGridContext } from './context/gridContext'
import { GridContextProvider } from './context/gridContext'
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
  const { loading, state, setState, getData, getGridColumns, defaultSearch } = useGridContext()

  return (
    <>
      <div className='page'>
        <FastGrid
          state={state}
          setState={setState}
          loading={loading}
          columns={getGridColumns()}
          getData={getData}
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
