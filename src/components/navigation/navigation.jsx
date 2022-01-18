import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Avatar } from 'antd'
import { FacebookFilled, GithubFilled, LinkedinFilled } from '@ant-design/icons'
import luna from 'assets/luna.jpg'
import soundCloud from 'assets/sound-cloud.png'

export const Navigation = () => {
  const [activePage, setActivePage] = useState()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/') navigate('../home')
    setActivePage(location.pathname.substring(1))
  }, [location.pathname, navigate])

  const SiteLink = ({ page, title }) => (
    <Link
      to={`/${page}`}
      onClick={() => setActivePage(page)}
      className={`site-link ${activePage === page ? 'active' : ''}`}
    >
      {title}
    </Link>
  )

  const externalLinks = (
    <div>
      <LinkedinFilled
        className='external-link clickable'
        onClick={() => window.open('https://www.linkedin.com/in/kevin-smith-26339411a/', '_blank')}
      />
      <GithubFilled
        className='external-link clickable'
        onClick={() => window.open('https://github.com/ksmith0813/portfolio', '_blank')}
      />
      <FacebookFilled
        className='external-link clickable'
        onClick={() => window.open('https://www.facebook.com/profile.php?id=20614115', '_blank')}
      />
      <img
        alt=''
        src={soundCloud}
        className='sound-cloud clickable'
        onClick={() => window.open('https://soundcloud.com/kevbot0813', '_blank')}
      />
    </div>
  )

  return (
    <>
      <div className='page-header'>
        <div>
          <Avatar src={luna} />
          <span className='pl-075 pr-200'>Kevin Smith</span>
          <SiteLink page='home' title='Home' />
          <SiteLink page='dashboard' title='Dashboard' />
          <SiteLink page='charts' title='Charts' />
          <SiteLink page='grid' title='Grid' />
          <SiteLink page='form' title='Form' />
        </div>
        {externalLinks}
      </div>
      <Outlet />
    </>
  )
}
