import React from 'react'
import { useSelector } from 'react-redux'
import { Steps, Row, Col } from 'antd'
import { getState as getRegisterState } from 'store/slices/registerSlice'
import { getState as getThemeState } from 'store/slices/themeSlice'
import Contact from './steps/contact'
import Movie from './steps/movie'
import Music from './steps/music'
import Travel from './steps/travel'
import { Review } from './steps/review'
import contactBlue from 'assets/default/contact-default.svg'
import contactGreen from 'assets/green/contact-green.svg'
import contactPurple from 'assets/purple/contact-purple.svg'
import movie from 'assets/movie.svg'
import movieBlue from 'assets/default/movie-default.svg'
import movieGreen from 'assets/green/movie-green.svg'
import moviePurple from 'assets/purple/movie-purple.svg'
import music from 'assets/music.svg'
import musicBlue from 'assets/default/music-default.svg'
import musicGreen from 'assets/green/music-green.svg'
import musicPurple from 'assets/purple/music-purple.svg'
import beach from 'assets/beach.svg'
import beachBlue from 'assets/default/beach-default.svg'
import beachGreen from 'assets/green/beach-green.svg'
import beachPurple from 'assets/purple/beach-purple.svg'
import info from 'assets/info.svg'
import infoBlue from 'assets/default/info-default.svg'
import infoGreen from 'assets/green/info-green.svg'
import infoPurple from 'assets/purple/info-purple.svg'
import './register.scss'

const { Step } = Steps

export const Register = () => {
  const state = useSelector(getRegisterState)
  const themeState = useSelector(getThemeState)
  const step = state.step
  const theme = themeState.selectedTheme
  const steps = [
    {
      title: 'Contact',
      content: <Contact />,
      icon: (
        <img
          src={theme === 'default' ? contactBlue : theme === 'green' ? contactGreen : contactPurple}
          className='register-icon'
          alt=''
        />
      ),
    },
    {
      title: 'Movies',
      content: <Movie />,
      icon: (
        <img
          src={step < 1 ? movie : theme === 'default' ? movieBlue : theme === 'green' ? movieGreen : moviePurple}
          className='register-icon'
          alt=''
        />
      ),
    },
    {
      title: 'Music',
      content: <Music />,
      icon: (
        <img
          src={step < 2 ? music : theme === 'default' ? musicBlue : theme === 'green' ? musicGreen : musicPurple}
          className='register-icon'
          alt=''
        />
      ),
    },
    {
      title: 'Travel',
      content: <Travel />,
      icon: (
        <img
          src={step < 3 ? beach : theme === 'default' ? beachBlue : theme === 'green' ? beachGreen : beachPurple}
          className='register-icon'
          alt=''
        />
      ),
    },
    {
      title: 'Review',
      content: <Review />,
      icon: (
        <img
          src={step < 4 ? info : theme === 'default' ? infoBlue : theme === 'green' ? infoGreen : infoPurple}
          className='register-icon'
          alt=''
        />
      ),
    },
  ]

  return (
    <div className='register-container'>
      <Row justify='center'>
        <Col span={11}>
          <Row justify='center' className='fs-175 pb-200'>
            Please complete the registration form below.
          </Row>
          <Row className='steps-header'>
            <Steps current={step}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} icon={item.icon} />
              ))}
            </Steps>
          </Row>

          {steps[step].content}
        </Col>
      </Row>
    </div>
  )
}
