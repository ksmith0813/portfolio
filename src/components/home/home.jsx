import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Spin } from 'antd'
import dashboard from 'assets/dashboard.svg'
import register from 'assets/register.svg'
import grid from 'assets/grid.svg'
import list from 'assets/list.svg'
import movie from 'assets/movie-tile.svg'
import shop from 'assets/shop.svg'
import visuals from 'assets/chart.svg'
import './home.scss'

export const Home = () => {
  const [activePage, setActivePage] = useState()
  const navigate = useNavigate()

  const goToPage = (page) => {
    setActivePage(page)
    setTimeout(() => navigate(`../${page}`), 1000)
  }

  const Tile = ({ title, image, className }) => (
    <div className='tile clickable' onClick={() => goToPage(title.toLowerCase())}>
      <div className='tile-title'>{activePage === title.toLowerCase() ? <Spin /> : title}</div>
      <img src={image} className={`tile-icon ${className}`} alt='' />
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
            Please check out some of these cool examples below.
          </Row>
          <Row justify='center'>
            <Tile title='Dashboard' image={dashboard} className='dashboard' />
            <Tile title='Register' image={register} className='register' />
            <Tile title='Grid' image={grid} className='grid' />
            <Tile title='List' image={list} className='list' />
            <Tile title='Search' image={movie} className='search' />
            <Tile title='Shop' image={shop} className='shop' />
            <Tile title='Visuals' image={visuals} className='visuals' />
          </Row>
        </div>
      </div>
    </>
  )
}
