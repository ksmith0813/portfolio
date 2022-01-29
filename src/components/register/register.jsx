import React from 'react'
import { useSelector } from 'react-redux'
import { Steps, Row, Col } from 'antd'
import { UserOutlined, VideoCameraOutlined, AudioOutlined, CarOutlined, SaveOutlined } from '@ant-design/icons'
import { getState } from 'store/slices/registerSlice'
import Contact from './steps/contact'
import Movie from './steps/movie'
import Music from './steps/music'
import Travel from './steps/travel'
import { Review } from './steps/review'
import './register.scss'

const { Step } = Steps

export const Register = () => {
  const state = useSelector(getState)
  const step = state.step
  const steps = [
    {
      title: 'Contact',
      content: <Contact />,
      icon: <UserOutlined />,
    },
    {
      title: 'Movies',
      content: <Movie />,
      icon: <VideoCameraOutlined />,
    },
    {
      title: 'Music',
      content: <Music />,
      icon: <AudioOutlined />,
    },
    {
      title: 'Travel',
      content: <Travel />,
      icon: <CarOutlined />,
    },
    {
      title: 'Review',
      content: <Review />,
      icon: <SaveOutlined />,
    },
  ]

  return (
    <div className='register-container'>
      <Row justify='center'>
        <Col span={11}>
          <Row justify='center' className='fs-150 pb-300'>
            Please complete the registration form below
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
