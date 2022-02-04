import React from 'react'
import { Col, Row } from 'antd'
import { Categories } from 'components/_siteWide/layout/layout'
import { useNavigate, useParams } from 'react-router-dom'
import { Movies } from './movies/movies'
import { Weather } from './weather/weather'
import './search.scss'

export const Search = () => {
  let { page } = useParams()
  const navigate = useNavigate()

  const onCategoryChange = (category) => {
    navigate(`../search/${category}`)
  }

  return (
    <div className=''>
      <div className='category-container'>
        <Categories items={['movies', 'weather']} selected={page || 'movies'} onClick={onCategoryChange} />
      </div>
      <div className='search-container'>
        <Row justify='center'>
          <Col span={13} className='pt-200'>
            <Row justify='center' className='fs-200 text-center'>
              Search for things
            </Row>
            <div className='pt-200'>
              {page === 'movies' && <Movies />}
              {page === 'weather' && <Weather />}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
