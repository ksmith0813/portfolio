import React from 'react'
import { Tag } from 'antd'
import { spacesToProperty } from 'utils/general'

export const FilterTags = ({ entries, removeTag }) => {
  return (
    <>
      {entries.map((e, i) => {
        const property = e[0]
        let display = e[1]

        if (typeof display === 'boolean') display = display === true ? 'Yes' : 'No'

        return (
          <Tag
            className='mt-150'
            key={i}
            closable
            onClose={() => {
              removeTag(property)
            }}
          >
            {`${spacesToProperty(property.toUpperCase())}: ${display.toUpperCase()}`}
          </Tag>
        )
      })}
    </>
  )
}
