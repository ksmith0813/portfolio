import React from 'react'
import { Row } from 'antd'

export const DataItem = ({ label, children }) => {
  if ((Array.isArray(children) && !children.length) || !children) children = 'N/A'
  return (
    <>
      <Row>
        <b>{label}</b>
      </Row>
      <Row className='light-text'>{children}</Row>
    </>
  )
}
