import React, { useState, useEffect, useRef } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Avatar } from 'antd'
import { DownOutlined, FacebookFilled, GithubFilled, LinkedinFilled } from '@ant-design/icons'
// import { ExternalLinks } from 'components/_siteWide/layout/layout'
import kevin from 'assets/kevin.jpg'

export const Navigation = () => {
  const ref = useRef()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activePage, setActivePage] = useState('home')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/') navigate('../home')
    if (location.pathname === '/search') navigate('../search/media')
    setActivePage(location.pathname.substring(1))
  }, [location.pathname, navigate])

  useEffect(() => {
    const outsideClick = (e) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) setIsMenuOpen(false)
    }

    document.addEventListener('mousedown', outsideClick)
    return () => document.removeEventListener('mousedown', outsideClick)
  }, [isMenuOpen])

  const SiteLink = ({ page, title }) => {
    return (
      <Link to={`/${page}`} className={`site-link ${activePage.includes(page) ? 'active' : ''}`}>
        {title}
      </Link>
    )
  }

  return (
    <>
      <div className='page-header'>
        <div className='fs-125'>Portfolio</div>
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
        <div className='user-container' onClick={() => setIsMenuOpen(true)}>
          <Avatar src={kevin} />
          <span className='pl-050 pr-050'>Kevin Smith</span>
          <DownOutlined className='fs-075 pr-075' />
        </div>
      </div>
      {isMenuOpen && (
        <ul ref={ref} className='user-menu'>
          <li
            className='flex items-center'
            onClick={() => window.open('https://www.linkedin.com/in/kevin-smith-26339411a/', '_blank')}
          >
            <LinkedinFilled className='pr-050 fs-125' />
            LinkedIn
          </li>
          <li
            className='flex items-center'
            onClick={() => window.open('https://github.com/ksmith0813/portfolio', '_blank')}
          >
            <GithubFilled className='pr-050 fs-125' />
            Github
          </li>
          <li
            className='flex items-center'
            onClick={() => window.open('https://www.facebook.com/profile.php?id=20614115', '_blank')}
          >
            <FacebookFilled className='pr-050 fs-125' />
            Facebook
          </li>
        </ul>
      )}
      <Outlet />
    </>
  )
}
