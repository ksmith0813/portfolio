import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CSVLink } from 'react-csv'
import { Drawer } from 'antd'
import { DownloadOutlined, InsertRowRightOutlined } from '@ant-design/icons'
import { SortableList } from 'components/_siteWide/sortableList/sortableList'

export const GridControls = () => {
  const grid = useSelector((state) => state.grid)
  const selectedTheme = useSelector((state) => state.theme.selectedTheme)
  const [showingSelection, setShowingSelection] = useState(false)

  return (
    <div className={`grid-controls ${selectedTheme}`}>
      <>
        <CSVLink data={grid.data} filename='user-data'>
          <DownloadOutlined className='pr-050' />
        </CSVLink>
        <InsertRowRightOutlined onClick={() => setShowingSelection(true)} />
        <Drawer
          title='Show | Reorder Columns'
          placement='right'
          onClose={() => setShowingSelection(false)}
          open={showingSelection}
        >
          <SortableList
            grid={grid}
            storeKey={grid.columnKey}
            defaultColumns={grid.defaultColumns}
            setShowingSelection={setShowingSelection}
          />
        </Drawer>
      </>
    </div>
  )
}
