import React from 'react'

export const PageHeader = ({ title, rightControls }) => (
  <div className='page-header pl-100 flex justify-sb items-center'>
    <div>{title}</div>
    {rightControls && <div className='right-controls'>{rightControls}</div>}
  </div>
)
