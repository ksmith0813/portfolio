import React, { useState } from 'react'
import { Drawer } from 'antd'
import { InsertRowRightOutlined } from '@ant-design/icons'
import { useGridContext } from '../context/gridContext'
import { ColumnSelection } from 'components/_siteWide/fastGrid/columnSelection/columnSelection'

export const GridControls = () => {
  const [showingSelection, setShowingSelection] = useState(false)
  const { state, setState, storageColumns } = useGridContext()

  if (!state.OriginalData.length) return null

  let columnList = []
  Object.keys(state.OriginalData[0]).map((p, i) => {
    if (state.IgnoreColumns.includes(p)) return p
    columnList.push({
      id: i,
      property: p,
      show: state.VisibleColumns.includes(p),
    })

    return p
  })

  return (
    <div className='grid-controls'>
      <>
        <InsertRowRightOutlined onClick={() => setShowingSelection(true)} />
        <Drawer
          title='Show | Reorder Columns'
          placement='right'
          onClose={() => setShowingSelection(false)}
          visible={showingSelection}
        >
          <ColumnSelection
            state={state}
            setState={setState}
            defaultColumns={state.DefaultColumns}
            storageColumns={storageColumns}
            columnList={columnList}
            setShowingSelection={setShowingSelection}
            storeKey='grid-columns'
          />
        </Drawer>
      </>
    </div>
  )
}
