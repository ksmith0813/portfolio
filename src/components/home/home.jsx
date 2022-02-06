import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import dashboard from 'assets/dashboard.svg'
import register from 'assets/register.svg'
import grid from 'assets/grid.svg'
import list from 'assets/list.svg'
import movie from 'assets/movie-tile.svg'
import shop from 'assets/shop.svg'
import umbrella from 'assets/umbrella.svg'
import visuals from 'assets/chart.svg'
import './home.scss'

export const Home = () => {
  const [activePage, setActivePage] = useState()
  const navigate = useNavigate()

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
      <div className='home'>
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
            <Tile page='dashboard' title='Dashboard' image={dashboard} />
            <Tile page='register' title='Register' image={register} />
            <Tile page='grid' title='User Grid' image={grid} />
            <Tile page='list' title='TODO List' image={list} />
          </Row>
          <Row justify='center'>
            <Tile page='search/media' title='Media Search' image={movie} className='media' />
            <Tile page='search/weather' title='Weather Finder' image={umbrella} className='weather' />
            <Tile page='shop' title='Shop' image={shop} />
            <Tile page='visuals' title='Visuals' image={visuals} />
          </Row>
        </div>
      </div>
    </>
  )
}
