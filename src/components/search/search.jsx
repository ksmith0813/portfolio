import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Col, Row } from 'antd'
import { Categories } from 'components/_siteWide/layout/layout'
import { getState } from 'store/slices/themeSlice'
import { Media } from './media/media'
import { Weather } from './weather/weather'
import './search.scss'

export const Search = () => {
  let { page } = useParams()
  const navigate = useNavigate()
  const state = useSelector(getState)

  const onCategoryChange = (category) => navigate(`../search/${category}`)

  return (
    <>
      <div className={`category-container ${state.selectedTheme}`}>
        <Categories items={['media', 'weather']} selected={page || 'media'} onClick={onCategoryChange} />
      </div>
      <div className='search-container'>
        <Row justify='center'>
          <Col span={13} className='pt-300'>
            <Row justify='center' className='fs-200 text-center'>
              Search for {page}
            </Row>
            <div className='pt-300'>
              {page === 'media' && <Media />}
              {page === 'weather' && <Weather />}
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
