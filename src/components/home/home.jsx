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
  UserOutlined,
} from '@ant-design/icons'
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
      case 'dashboard':
        setStartAngle(270)
        break
      case 'register':
        setStartAngle(210)
        break
      case 'grid':
        setStartAngle(150)
        break
      case 'shop':
        setStartAngle(90)
        break
      case 'visuals':
        setStartAngle(30)
        break
      default:
        setStartAngle(-30)
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
          <CircleMenuItem onClick={() => goToPage('dashboard')} tooltip='Dashboard' tooltipPlacement='top'>
            {activePage === 'dashboard' ? <LoadingOutlined /> : <DashboardOutlined />}
          </CircleMenuItem>
          <CircleMenuItem onClick={() => goToPage('register')} tooltip='Register' tooltipPlacement='top'>
            {activePage === 'register' ? <LoadingOutlined /> : <FormOutlined />}
          </CircleMenuItem>
          <CircleMenuItem onClick={() => goToPage('grid')} tooltip='Grid' tooltipPlacement='top'>
            {activePage === 'grid' ? <LoadingOutlined /> : <TableOutlined />}
          </CircleMenuItem>
          <CircleMenuItem onClick={() => goToPage('shop')} tooltip='Shop' tooltipPlacement='top'>
            {activePage === 'shop' ? <LoadingOutlined /> : <ShoppingCartOutlined />}
          </CircleMenuItem>
          <CircleMenuItem onClick={() => goToPage('visuals')} tooltip='Visuals' tooltipPlacement='top'>
            {activePage === 'visuals' ? <LoadingOutlined /> : <BarChartOutlined />}
          </CircleMenuItem>
          <CircleMenuItem onClick={() => goToPage('about')} tooltip='About' tooltipPlacement='top'>
            {activePage === 'about' ? <LoadingOutlined /> : <UserOutlined />}
          </CircleMenuItem>
        </CircleMenu>
      </div>
    </>
  )
}
