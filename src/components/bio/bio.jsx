import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar } from 'antd'
import { ExternalLinks } from 'components/_siteWide/layout/layout'
import { getState } from 'store/slices/themeSlice'
import signature from 'assets/signature.png'
import kevin from 'assets/kevin.jpg'
import './bio.scss'

export const Bio = () => {
  const state = useSelector(getState)
  return (
    <div className={`bio-container ${state.selectedTheme}`}>
      <div className='description'>
        <div className='fs-125'>
          <b>Hello!</b>
        </div>
        <div>
          I am a passionate Software Developer with a demonstrated history of success in the computer software industry.
          Strong engineering professional skilled in React, React-Native, Redux, JavaScript, HTML, SCSS, Axios, Nivo,
          C#, .NET, SQL Server. I love hanging out on the beach and getting lost in the woods and canyons. Traveling the
          world and going on endless adventures will always keep me moving forward. Aside from building software
          applications, I have a passion for making music in my home studio. Let's crank some code and rock out!
          <ExternalLinks extraClasses='external-links' theme='dark' />
          <img className='signature' src={signature} alt='' />
        </div>
      </div>
      <Avatar className='me-image' src={kevin} alt='' />
    </div>
  )
}
