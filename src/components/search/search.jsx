import React from 'react'
import { useParams } from 'react-router-dom'
import { Col, Row } from 'antd'
import { Media } from './media/media'
import { Weather } from './weather/weather'

export const Search = () => {
  const { page } = useParams()

  return (
    <Row justify='center'>
      <Col span={13} className='pt-300'>
        <Row justify='center' className='fs-200 text-center capitalize'>
          Search for {page}
        </Row>
        <div className='pt-300'>
          {page === 'media' && <Media />}
          {page === 'weather' && <Weather showDetails />}
        </div>
      </Col>
    </Row>
  )
}
