import React from 'react'
import { useSelector } from 'react-redux'
import { Steps, Row, Col } from 'antd'
import { getState } from 'store/slices/registerSlice'
import Contact from './steps/contact'
import Movie from './steps/movie'
import Music from './steps/music'
import Travel from './steps/travel'
import { Review } from './steps/review'
import contact from 'assets/contact.svg'
import contactActive from 'assets/contact-active.svg'
import movie from 'assets/movie.svg'
import movieActive from 'assets/movie-active.svg'
import boombox from 'assets/boombox.svg'
import boomboxActive from 'assets/boombox-active.svg'
import beach from 'assets/beach.svg'
import beachActive from 'assets/beach-active.svg'
import information from 'assets/information.svg'
import informationActive from 'assets/information-active.svg'
import './register.scss'

const { Step } = Steps

export const Register = () => {
  const state = useSelector(getState)
  const step = state.step
  const steps = [
    {
      title: 'Contact',
      content: <Contact />,
      icon: <img src={step >= 0 ? contactActive : contact} className='register-icon' alt='' />,
    },
    {
      title: 'Movies',
      content: <Movie />,
      icon: <img src={step >= 1 ? movieActive : movie} className='register-icon' alt='' />,
    },
    {
      title: 'Music',
      content: <Music />,
      icon: <img src={step >= 2 ? boomboxActive : boombox} className='register-icon' alt='' />,
    },
    {
      title: 'Travel',
      content: <Travel />,
      icon: <img src={step >= 3 ? beachActive : beach} className='register-icon' alt='' />,
    },
    {
      title: 'Review',
      content: <Review />,
      icon: <img src={step === 4 ? informationActive : information} className='register-icon' alt='' />,
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
