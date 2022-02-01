import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Tooltip } from 'antd'
import { FacebookFilled, GithubFilled, LinkedinFilled } from '@ant-design/icons'
import kevin from 'assets/kevin.jpg'
import soundCloud from 'assets/sound-cloud.png'

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

  const externalLinks = (
    <div>
      <Tooltip title='LinkedIn' mouseEnterDelay={0.5}>
        <LinkedinFilled
          className='external-link clickable'
          onClick={() => window.open('https://www.linkedin.com/in/kevin-smith-26339411a/', '_blank')}
        />
      </Tooltip>
      <Tooltip title='Github' mouseEnterDelay={0.5}>
        <GithubFilled
          className='external-link clickable'
          onClick={() => window.open('https://github.com/ksmith0813/portfolio', '_blank')}
        />
      </Tooltip>
      <Tooltip title='Facebook' mouseEnterDelay={0.5}>
        <FacebookFilled
          className='external-link clickable'
          onClick={() => window.open('https://www.facebook.com/profile.php?id=20614115', '_blank')}
        />
      </Tooltip>
      <Tooltip title='SoundCloud' mouseEnterDelay={0.5}>
        <img
          alt=''
          src={soundCloud}
          className='sound-cloud clickable'
          onClick={() => window.open('https://soundcloud.com/kevbot0813', '_blank')}
        />
      </Tooltip>
    </div>
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
          <SiteLink page='shop' title='Shop' />
          <SiteLink page='visuals' title='Visuals' />
          <SiteLink page='about' title='Bio' />
        </div>
        {externalLinks}
      </div>
      <Outlet />
    </>
  )
}
