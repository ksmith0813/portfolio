import React from 'react'
import { Row, Spin, Tag } from 'antd'
import { isArray } from 'utils/general'
import './layout.scss'

export const DataItem = ({ label, children }) => {
  if ((isArray(children) && !children.length) || !children) children = 'N/A'
  return (
    <>
      <Row>
        <b>{label}</b>
      </Row>
      <Row className='light-text'>{children}</Row>
    </>
  )
}

export const Categories = ({ items, selected, onClick }) => {
  return items.map((c, i) => (
    <span className={`${selected === c && 'selected'} clickable`} key={i} onClick={() => onClick(c)}>
      {c}
    </span>
  ))
}

export const Loader = () => (
  <div className='pt-500'>
    <Spin size='large' />
  </div>
)

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
