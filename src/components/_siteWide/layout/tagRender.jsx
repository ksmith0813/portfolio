import React from 'react'
import { Tag } from 'antd'

export const TagRender = (props) => {
  const { label, closable, onClose } = props
  const onPreventMouseDown = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <Tag color='blue' onMouseDown={onPreventMouseDown} closable={closable} onClose={onClose} className='mr-050'>
      {label}
    </Tag>
  )
}
