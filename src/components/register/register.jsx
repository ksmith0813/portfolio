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
import movie from 'assets/movie.svg'
import music from 'assets/music.svg'
import beach from 'assets/beach.svg'
import information from 'assets/information.svg'
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
      icon: <img src={`theme/${theme}/contact-${theme}.svg`} className='register-icon' alt='' />,
    },
    {
      title: 'Movies',
      content: <Movie />,
      icon: <img src={step >= 1 ? `theme/${theme}/movie-${theme}.svg` : movie} className='register-icon' alt='' />,
    },
    {
      title: 'Music',
      content: <Music />,
      icon: <img src={step >= 2 ? `theme/${theme}/music-${theme}.svg` : music} className='register-icon' alt='' />,
    },
    {
      title: 'Travel',
      content: <Travel />,
      icon: <img src={step >= 3 ? `theme/${theme}/beach-${theme}.svg` : beach} className='register-icon' alt='' />,
    },
    {
      title: 'Review',
      content: <Review />,
      icon: (
        <img
          src={step === 4 ? `theme/${theme}/information-${theme}.svg` : information}
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
          <Steps current={step}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} icon={item.icon} />
            ))}
          </Steps>
          {steps[step].content}
        </Col>
      </Row>
    </div>
  )
}
