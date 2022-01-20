import React from 'react'
import { Tag } from 'antd'

export const Categories = ({ items, selected, onClick }) => {
  return items.map((c, i) => (
    <Tag className={`${selected === c && 'selected'} clickable`} key={i} onClick={() => onClick(c)}>
      {c}
    </Tag>
  ))
}
