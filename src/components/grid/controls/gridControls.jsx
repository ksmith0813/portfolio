import React, { useState } from 'react'
import { Drawer } from 'antd'
import { InsertRowRightOutlined } from '@ant-design/icons'
import { useGridContext } from '../context/gridContext'
import { ColumnSelection } from 'components/_siteWide/fastGrid/columnSelection/columnSelection'

export const GridControls = () => {
  const [showingSelection, setShowingSelection] = useState(false)
  const { state, setState, getColummSelectionList } = useGridContext()

  if (!state.OriginalData.length) return null

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
            columnList={getColummSelectionList()}
            setShowingSelection={setShowingSelection}
            storeKey='grid-columns'
          />
        </Drawer>
      </>
    </div>
  )
}
