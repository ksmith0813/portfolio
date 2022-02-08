import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { getState } from 'store/slices/themeSlice'
import './home.scss'

export const Home = () => {
  const [activePage, setActivePage] = useState()
  const navigate = useNavigate()
  const state = useSelector(getState)
  const theme = state.selectedTheme

  const goToPage = (page) => {
    setActivePage(page)
    setTimeout(() => navigate(`../${page}`), 1000)
  }

  const Tile = ({ page, title, image, className = '' }) => (
    <div className='tile clickable' onClick={() => goToPage(page)}>
      <div className='tile-title'>{activePage === page ? <LoadingOutlined /> : title}</div>
      <img src={image} className={`tile-icon ${className || page}`} alt='' />
    </div>
  )

  return (
    <>
      <div className={`home ${theme}`}>
        <Row justify='center' className='hello'>
          Hello.
        </Row>
        <Row justify='center' className='home-description'>
          <Col span={12}>
            My name is Kevin Smith, nice to meet you. Welcome to my React portfolio application. This site demonstrates
            my ability as a senior frontend software engineer. The tech stack is ReactJS, Redux, Functional Components,
            ANT Design, SCSS, and Axios for hitting API endpoints. Feel free to explore some of the examples below, I
            definitely had some fun coding the pages in this demo application.
          </Col>
        </Row>
        <div className='tile-container'>
          <Row justify='center'>
            <Tile
              page='dashboard'
              title='Dashboard'
              image={`theme/${theme}/dashboard-tile-${theme}.svg`}
            />
            <Tile page='register' title='Register' image={`theme/${theme}/register-tile-${theme}.svg`} />
            <Tile page='grid' title='User Grid' image={`theme/${theme}/grid-tile-${theme}.svg`} />
            <Tile page='list' title='TODO List' image={`theme/${theme}/list-tile-${theme}.svg`} />
          </Row>
          <Row justify='center'>
            <Tile
              page='search/media'
              title='Media Search'
              image={`theme/${theme}/movie-tile-${theme}.svg`}
              className='media'
            />
            <Tile
              page='search/weather'
              title='Weather Finder'
              image={`theme/${theme}/umbrella-tile-${theme}.svg`}
              className='weather'
            />
            <Tile page='shop' title='Shop' image={`theme/${theme}/shop-tile-${theme}.svg`} />
            <Tile page='visuals' title='Visuals' image={`theme/${theme}/chart-tile-${theme}.svg`} />
          </Row>
        </div>
      </div>
    </>
  )
}
