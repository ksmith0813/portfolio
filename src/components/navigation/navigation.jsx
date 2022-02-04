import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Avatar } from 'antd'
import { ExternalLinks } from 'components/_siteWide/layout/layout'
import kevin from 'assets/kevin.jpg'

export const Navigation = () => {
  const [activePage, setActivePage] = useState('home')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/') navigate('../home')
    setActivePage(location.pathname.substring(1))
  }, [location.pathname, navigate])

  const SiteLink = ({ page, title }) => (
    <Link to={`/${page}`} className={`site-link ${activePage === page ? 'active' : ''}`}>
      {title}
    </Link>
  )

  return (
    <>
      <div className='page-header'>
        <div>
          <Avatar src={kevin} />
          <span className='pl-075 pr-200'>Kevin Smith</span>
        </div>
        <div>
          <SiteLink page='home' title='Home' />
          <SiteLink page='dashboard' title='Dashboard' />
          <SiteLink page='register' title='Register' />
          <SiteLink page='grid' title='Grid' />
          <SiteLink page='list' title='List' />
          <SiteLink page='search' title='Search' />
          <SiteLink page='shop' title='Shop' />
          <SiteLink page='visuals' title='Visuals' />
          <SiteLink page='bio' title='Bio' />
        </div>
        <div>
          <ExternalLinks />
        </div>
      </div>
      <Outlet />
    </>
  )
}
