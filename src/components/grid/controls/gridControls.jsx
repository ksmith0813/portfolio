import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Drawer } from 'antd'
import { InsertRowRightOutlined } from '@ant-design/icons'
import { ColumnSelection } from 'components/_siteWide/fastGrid/columnSelection/columnSelection'
import { getState } from 'store/slices/gridSlice'

export const GridControls = () => {
  const state = useSelector(getState)
  const [showingSelection, setShowingSelection] = useState(false)

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
            storeKey={state.ColumnKey}
            defaultColumns={state.DefaultColumns}
            setShowingSelection={setShowingSelection}
          />
        </Drawer>
      </>
    </div>
  )
}
