import React, { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { FacebookFilled, GithubFilled, LinkedinFilled } from '@ant-design/icons'
import soundCloud from 'assets/sound-cloud.png'
import { useEffect } from 'react'

export const Navigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const getActivePage = () => location.pathname.substring(1)
  const [activePage, setActivePage] = useState(getActivePage())

  useEffect(() => {
    if (location.pathname === '/') navigate('../home')
    setActivePage(getActivePage())
  }, [location.pathname])

  const SiteLink = ({ page, title }) => (
    <Link
      to={`/${page}`}
      onClick={() => setActivePage(page)}
      className={`site-link ${activePage === page ? 'active' : ''}`}
    >
      {title}
    </Link>
  )

  const rightControls = (
    <div>
      <LinkedinFilled
        className='mt-1 pl-050'
        onClick={() => (window.location.href = 'https://www.linkedin.com/in/kevin-smith-26339411a/')}
      />
      <GithubFilled
        className='mt-1 pl-050'
        onClick={() => (window.location.href = 'https://https://github.com/ksmith0813/kevin_smith')}
      />
      <FacebookFilled
        className='mt-1 pl-050'
        onClick={() => (window.location.href = 'https://www.facebook.com/profile.php?id=20614115')}
      />
      <img
        alt=''
        src={soundCloud}
        className='sound-cloud'
        onClick={() => (window.location.href = 'https://soundcloud.com/kevbot0813')}
      />
    </div>
  )

  return (
    <>
      <div className='page-header pl-100 flex justify-sb items-center'>
        <div>
          <span className='pr-200'>Kevin Smith - Software Engineer</span>
          <SiteLink page='home' title='Home' />
          <SiteLink page='dashboard' title='Dashboard' />
          <SiteLink page='charts' title='Charts' />
          <SiteLink page='grid' title='Grid' />
          <SiteLink page='form' title='Form' />
        </div>
        {rightControls && <div className='right-controls'>{rightControls}</div>}
      </div>
      <Outlet />
    </>
  )
}
