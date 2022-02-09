import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from 'antd'
import { getState, setSelectedTheme } from 'store/slices/themeSlice'

const { SubMenu } = Menu

export const Navigation = () => {
  const [activePage, setActivePage] = useState('home')
  const location = useLocation()
  const navigate = useNavigate()
  const state = useSelector(getState)
  const dispatch = useDispatch()

  useEffect(() => {
    if (location.pathname === '/') navigate('../home')
    if (location.pathname === '/search') navigate('../search/media')
    setActivePage(location.pathname.substring(1))
  }, [location.pathname, navigate])

  const SiteLink = ({ page, title }) => <Link to={`/${page}`}>{title}</Link>

  return (
    <>
      <Menu mode='horizontal' selectedKeys={[activePage]} className={`page-header ${state.selectedTheme}`}>
        <Menu.Item key='home'>
          <SiteLink page='home' title='Home' />
        </Menu.Item>
        <Menu.Item key='dashboard'>
          <SiteLink page='dashboard' title='Dashboard' />
        </Menu.Item>
        <Menu.Item key='register'>
          <SiteLink page='register' title='Register' />
        </Menu.Item>
        <Menu.Item key='grid'>
          <SiteLink page='grid' title='Grid' />
        </Menu.Item>
        <Menu.Item key='menu'>
          <SiteLink page='menu' title='Menu' />
        </Menu.Item>
        <Menu.Item key='list'>
          <SiteLink page='list' title='List' />
        </Menu.Item>
        <Menu.Item key='search/media'>
          <SiteLink page='search/media' title='Media' />
        </Menu.Item>
        <Menu.Item key='search/weather'>
          <SiteLink page='search/weather' title='Weather' />
        </Menu.Item>
        <Menu.Item key='shop'>
          <SiteLink page='shop' title='Shop' />
        </Menu.Item>
        <Menu.Item key='visuals'>
          <SiteLink page='visuals' title='Visuals' />
        </Menu.Item>
        <Menu.Item key='bio'>
          <SiteLink page='bio' title='Bio' />
        </Menu.Item>
        <SubMenu key='theme' title='Theme'>
          <Menu.Item key='blue' onClick={() => dispatch(setSelectedTheme('default'))}>
            Blue
          </Menu.Item>
          <Menu.Item key='green' onClick={() => dispatch(setSelectedTheme('green'))}>
            Green
          </Menu.Item>
        </SubMenu>
      </Menu>
      <Outlet />
    </>
  )
}
