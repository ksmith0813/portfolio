import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Layout, Menu } from 'antd'
import {
  HomeOutlined,
  LayoutOutlined,
  FormOutlined,
  TableOutlined,
  VideoCameraOutlined,
  UnorderedListOutlined,
  CustomerServiceOutlined,
  RadarChartOutlined,
  ShoppingOutlined,
  BarChartOutlined,
  BgColorsOutlined,
  UserOutlined,
  NodeExpandOutlined,
} from '@ant-design/icons'
import { getState, setSelectedTheme } from 'store/slices/themeSlice'
import kevin from 'assets/Kevin.jpg'
import signature from 'assets/signature.png'
import './navigation.scss'

const { Header, Sider, Content } = Layout

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

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <SiteLink page='home' title='Home' />,
    },
    {
      key: 'dashboard',
      icon: <LayoutOutlined />,
      label: <SiteLink page='dashboard' title='Dashboard' />,
    },
    {
      key: 'register',
      icon: <FormOutlined />,
      label: <SiteLink page='register' title='Register' />,
    },
    {
      key: 'grid',
      icon: <TableOutlined />,
      label: <SiteLink page='grid' title='Grid' />,
    },
    {
      key: 'video',
      icon: <VideoCameraOutlined />,
      label: <SiteLink page='video' title='Video' />,
    },
    {
      key: 'list',
      icon: <UnorderedListOutlined />,
      label: <SiteLink page='list' title='List' />,
    },
    {
      key: 'tree',
      icon: <NodeExpandOutlined />,
      label: <SiteLink page='tree' title='Tree' />,
    },
    {
      key: 'search/media',
      icon: <CustomerServiceOutlined />,
      label: <SiteLink page='search/media' title='Media' />,
    },
    {
      key: 'search/weather',
      icon: <RadarChartOutlined />,
      label: <SiteLink page='search/weather' title='Weather' />,
    },
    {
      key: 'shop',
      icon: <ShoppingOutlined />,
      label: <SiteLink page='shop' title='Shop' />,
    },
    {
      key: 'visuals',
      icon: <BarChartOutlined />,
      label: <SiteLink page='visuals' title='Visuals' />,
    },
    {
      key: 'bio',
      icon: <UserOutlined />,
      label: <SiteLink page='bio' title='Bio' />,
    },
    {
      key: 'theme',
      icon: <BgColorsOutlined />,
      label: <SiteLink page='theme' title='Theme' />,
      children: [
        {
          key: 'blue',
          label: 'Blue',
          onClick: () => dispatch(setSelectedTheme('default')),
        },
        {
          key: 'green',
          label: 'Green',
          onClick: () => dispatch(setSelectedTheme('green')),
        },
        {
          key: 'purple',
          label: 'Purple',
          onClick: () => dispatch(setSelectedTheme('purple')),
        },
      ],
    },
  ]

  return (
    <Layout className={`app-layout ${state.selectedTheme}`}>
      <Sider trigger={null} collapsible collapsed={true} className='site-nav-container'>
        <div className='logo'>
          <Avatar src={kevin}></Avatar>
        </div>
        <Menu mode='inline' selectedKeys={[activePage]} className='site-nav' items={menuItems} />
      </Sider>
      <Layout>
        <Header className='site-header'>
          <img src={signature} alt='' />
        </Header>
        <Content className='site-content'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
