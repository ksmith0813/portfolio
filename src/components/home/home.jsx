import React, { useEffect, useState } from 'react'
import { CircleMenu, CircleMenuItem } from 'react-circular-menu'
import { useNavigate } from 'react-router-dom'
import {
  LoadingOutlined,
  DashboardOutlined,
  FormOutlined,
  ShoppingCartOutlined,
  TableOutlined,
  BarChartOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import kevin from 'assets/kevin.jpg'
import './home.scss'

export const Home = () => {
  const [startAngle, setStartAngle] = useState(-90)
  const [activePage, setActivePage] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const centerControl = document.querySelector('.home > div > div:nth-child(2)')
    centerControl.click()
  }, [])

  const goToPage = (page) => {
    switch (page) {
      case 'about':
        setStartAngle(270)
        break
      case 'dashboard':
        setStartAngle(220)
        break
      case 'register':
        setStartAngle(170)
        break
      case 'grid':
        setStartAngle(117)
        break
      case 'list':
        setStartAngle(66)
        break
      case 'shop':
        setStartAngle(16)
        break
      default:
        setStartAngle(-36)
        break
    }

    setTimeout(() => setActivePage(page), 700)
    setTimeout(() => navigate(`../${page}`), 2000)
  }

  return (
    <>
      <div className='home-cover-image' />
      <div className='page-center home'>
        <span className='title'>Home</span>
        <CircleMenu
          menuActive={1}
          startAngle={startAngle}
          rotationAngle={360}
          itemSize={10}
          radius={20}
          rotationAngleInclusive={false}
        >
          <CircleMenuItem onClick={() => goToPage('about')} tooltip='About' tooltipPlacement='top'>
            {activePage === 'about' ? <LoadingOutlined /> : <img src={kevin} className='kevin' alt='' />}
          </CircleMenuItem>
          <CircleMenuItem onClick={() => goToPage('dashboard')} tooltip='Dashboard' tooltipPlacement='top'>
            {activePage === 'dashboard' ? <LoadingOutlined /> : <DashboardOutlined />}
          </CircleMenuItem>
          <CircleMenuItem onClick={() => goToPage('register')} tooltip='Register' tooltipPlacement='top'>
            {activePage === 'register' ? <LoadingOutlined /> : <FormOutlined />}
          </CircleMenuItem>
          <CircleMenuItem onClick={() => goToPage('grid')} tooltip='Grid' tooltipPlacement='top'>
            {activePage === 'grid' ? <LoadingOutlined /> : <TableOutlined />}
          </CircleMenuItem>
          <CircleMenuItem onClick={() => goToPage('list')} tooltip='List' tooltipPlacement='top'>
            {activePage === 'list' ? <LoadingOutlined /> : <UnorderedListOutlined />}
          </CircleMenuItem>
          <CircleMenuItem onClick={() => goToPage('shop')} tooltip='Shop' tooltipPlacement='top'>
            {activePage === 'shop' ? <LoadingOutlined /> : <ShoppingCartOutlined />}
          </CircleMenuItem>
          <CircleMenuItem onClick={() => goToPage('visuals')} tooltip='Visuals' tooltipPlacement='top'>
            {activePage === 'visuals' ? <LoadingOutlined /> : <BarChartOutlined />}
          </CircleMenuItem>
        </CircleMenu>
      </div>
    </>
  )
}
