import React from 'react'
import './layout.scss'

export const Categories = ({ items, selected, onClick }) => {
  return items.map((c, i) => (
    <span className={`${selected === c && 'selected'} clickable`} key={i} onClick={() => onClick(c)}>
      {c}
    </span>
  ))
}
