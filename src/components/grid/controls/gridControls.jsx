import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CSVLink } from 'react-csv'
import { Drawer } from 'antd'
import { DownloadOutlined, InsertRowRightOutlined } from '@ant-design/icons'
import { SortableList } from 'components/_siteWide/sortableList/sortableList'
import { getState } from 'store/slices/gridSlice'
import { getState as getThemeState } from 'store/slices/themeSlice'

export const GridControls = () => {
  const state = useSelector(getState)
  const themeState = useSelector(getThemeState)
  const theme = themeState.selectedTheme
  const [showingSelection, setShowingSelection] = useState(false)

  return (
    <div className={`grid-controls ${theme}`}>
      <>
        <CSVLink data={state.data} filename='user-data'>
          <DownloadOutlined className='pr-050' />
        </CSVLink>
        <InsertRowRightOutlined onClick={() => setShowingSelection(true)} />
        <Drawer
          title='Show | Reorder Columns'
          placement='right'
          onClose={() => setShowingSelection(false)}
          visible={showingSelection}
        >
          <SortableList
            state={state}
            storeKey={state.columnKey}
            defaultColumns={state.defaultColumns}
            setShowingSelection={setShowingSelection}
          />
        </Drawer>
      </>
    </div>
  )
}
