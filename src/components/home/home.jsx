import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row } from 'antd'
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
        <div className='banner'>
          <div className='title'>Hello.</div>
          <div className='description'>Welcome to my React portfolio app.</div>
        </div>
        <div className='tile-container'>
          <Row justify='center' className='tile-header'>
            Check out some of these examples below.
          </Row>
          <Row justify='center'>
            <Tile page='dashboard' title='Dashboard' image={dashboard} />
            <Tile page='register' title='Register' image={register} />
            <Tile page='grid' title='User Grid' image={grid} />
            <Tile page='list' title='TODO List' image={list} />
          </Row>
          <Row justify='center'>
            <Tile page='search/movies' title='Media Search' image={movie} className='movies' />
            <Tile page='search/weather' title='Weather Finder' image={umbrella} className='weather' />
            <Tile page='shop' title='Shop' image={shop} />
            <Tile page='visuals' title='Visuals' image={visuals} />
          </Row>
        </div>
      </div>
    </>
  )
}
