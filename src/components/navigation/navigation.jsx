import React, { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Avatar, Col, Layout, Menu, Row, Tooltip } from 'antd'
import { LinkedinFilled, GithubFilled } from '@ant-design/icons'
import { getState } from 'store/slices/themeSlice'
import kevin from 'assets/Kevin.jpg'
import signature from 'assets/signature.png'
import { MenuItems } from './menuItems'
import './navigation.scss'

const { Header, Sider, Content } = Layout

export const Navigation = () => {
  const [activePage, setActivePage] = useState('home')
  const location = useLocation()
  const navigate = useNavigate()
  const state = useSelector(getState)

  useEffect(() => {
    if (location.pathname === '/') navigate('../home')
    if (location.pathname === '/search') navigate('../search/media')
    setActivePage(location.pathname.substring(1))
  }, [location.pathname, navigate])

  const ExternalLinks = () => (
    <div className='external-links'>
      <Tooltip title='LinkedIn' mouseEnterDelay={0.5}>
        <LinkedinFilled
          className='fs-175 mr-025'
          onClick={() => window.open('https://www.linkedin.com/in/kevin-smith-26339411a/', '_blank')}
        />
      </Tooltip>
      <Tooltip title='Github' mouseEnterDelay={0.5}>
        <GithubFilled
          className='fs-175 ml-050'
          onClick={() => window.open('https://github.com/ksmith0813/portfolio', '_blank')}
        />
      </Tooltip>
    </div>
  )

  return (
    <Layout className={`app-layout ${state.selectedTheme}`}>
      <Sider trigger={null} collapsible collapsed={true} className='site-nav-container'>
        <div className='logo'>
          <Avatar src={kevin}></Avatar>
        </div>
        <Menu mode='inline' selectedKeys={[activePage]} className='site-nav' items={MenuItems()} />
      </Sider>
      <Layout>
        <Header className='site-header'>
          <Row>
            <Col flex={1}>
              <img className='signature' src={signature} alt='' />
            </Col>
            <Col>
              <ExternalLinks />
            </Col>
          </Row>
        </Header>
        <Content className='site-content'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
