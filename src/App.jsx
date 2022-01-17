import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { FacebookFilled, GithubFilled, LinkedinFilled } from '@ant-design/icons'
import soundCloud from 'assets/sound-cloud.png'

export const App = () => {
  const [activePage, setActivePage] = useState('')
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
          <Link
            to='/home'
            onClick={() => setActivePage('')}
            className={`site-link ${activePage === '' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to='/charts'
            onClick={() => setActivePage('charts')}
            className={`site-link ${activePage === 'charts' ? 'active' : ''}`}
          >
            Charts
          </Link>
          <Link
            to='/table'
            onClick={() => setActivePage('table')}
            className={`site-link ${activePage === 'table' ? 'active' : ''}`}
          >
            Grid
          </Link>
          <Link
            to='/form'
            onClick={() => setActivePage('form')}
            className={`site-link ${activePage === 'form' ? 'active' : ''}`}
          >
            Form
          </Link>
        </div>
        {rightControls && <div className='right-controls'>{rightControls}</div>}
      </div>
      <Outlet />
    </>
  )
}
