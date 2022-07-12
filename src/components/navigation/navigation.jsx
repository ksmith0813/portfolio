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

  const menu = (
    <Menu mode='inline' selectedKeys={[activePage]} className={`site-nav ${state.selectedTheme}`}>
      <Menu.Item key='home' icon={<HomeOutlined />}>
        <SiteLink page='home' title='Home' />
      </Menu.Item>
      <Menu.Item key='dashboard' icon={<LayoutOutlined />}>
        <SiteLink page='dashboard' title='Dashboard' />
      </Menu.Item>
      <Menu.Item key='register' icon={<FormOutlined />}>
        <SiteLink page='register' title='Register' />
      </Menu.Item>
      <Menu.Item key='grid' icon={<TableOutlined />}>
        <SiteLink page='grid' title='Grid' />
      </Menu.Item>
      <Menu.Item key='video' icon={<VideoCameraOutlined />}>
        <SiteLink page='video' title='Video' />
      </Menu.Item>
      <Menu.Item key='list' icon={<UnorderedListOutlined />}>
        <SiteLink page='list' title='List' />
      </Menu.Item>
      <Menu.Item key='tree' icon={<NodeExpandOutlined />}>
        <SiteLink page='tree' title='Tree' />
      </Menu.Item>
      <Menu.Item key='search/media' icon={<CustomerServiceOutlined />}>
        <SiteLink page='search/media' title='Media' />
      </Menu.Item>
      <Menu.Item key='search/weather' icon={<RadarChartOutlined />}>
        <SiteLink page='search/weather' title='Weather' />
      </Menu.Item>
      <Menu.Item key='shop' icon={<ShoppingOutlined />}>
        <SiteLink page='shop' title='Shop' />
      </Menu.Item>
      <Menu.Item key='visuals' icon={<BarChartOutlined />}>
        <SiteLink page='visuals' title='Visuals' />
      </Menu.Item>
      <Menu.Item key='bio' icon={<UserOutlined />}>
        <SiteLink page='bio' title='Bio' />
      </Menu.Item>
      <SubMenu key='theme' title='Theme' icon={<BgColorsOutlined />}>
        <Menu.Item key='blue' onClick={() => dispatch(setSelectedTheme('default'))}>
          Blue
        </Menu.Item>
        <Menu.Item key='green' onClick={() => dispatch(setSelectedTheme('green'))}>
          Green
        </Menu.Item>
        <Menu.Item key='purple' onClick={() => dispatch(setSelectedTheme('purple'))}>
          Purple
        </Menu.Item>
      </SubMenu>
    </Menu>
  )

  return (
    <Layout className='app-layout'>
      <Sider trigger={null} collapsible collapsed={true} className='site-nav-container'>
        <div className='logo'>
          <Avatar src={kevin}></Avatar>
        </div>
        {menu}
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
