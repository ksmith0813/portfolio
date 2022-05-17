import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, Tooltip } from 'antd'
import { GithubFilled, LinkedinFilled } from '@ant-design/icons'
import { getState } from 'store/slices/themeSlice'
import signature from 'assets/signature.png'
import kevin from 'assets/Kevin.jpg'
import soundCloud from 'assets/sound-cloud.png'
import './bio.scss'

export const Bio = () => {
  const state = useSelector(getState)

  const ExternalLinks = () => (
    <div className='external-links'>
      <Tooltip title='LinkedIn' mouseEnterDelay={0.5}>
        <LinkedinFilled
          className={`external-link`}
          onClick={() => window.open('https://www.linkedin.com/in/kevin-smith-26339411a/', '_blank')}
        />
      </Tooltip>
      <Tooltip title='Github' mouseEnterDelay={0.5}>
        <GithubFilled
          className={`external-link`}
          onClick={() => window.open('https://github.com/ksmith0813/portfolio', '_blank')}
        />
      </Tooltip>
      <Tooltip title='SoundCloud' mouseEnterDelay={0.5}>
        <img
          alt=''
          src={soundCloud}
          className={`sound-cloud`}
          onClick={() => window.open('https://soundcloud.com/kevbot0813', '_blank')}
        />
      </Tooltip>
    </div>
  )

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
          <ExternalLinks />
          <img className='signature' src={signature} alt='' />
        </div>
      </div>
      <Avatar className='me-image' src={kevin} alt='' />
    </div>
  )
}
