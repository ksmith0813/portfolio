import React from 'react'
import { Steps, Row, Col } from 'antd'
import { RegisterContextProvider, useRegisterContext } from './context/registerContext'
import { Contact } from './steps/contact'
import { Movie } from './steps/movie'
import { Music } from './steps/music'
import { Travel } from './steps/travel'
import { Review } from './steps/review'
import './register.scss'

const { Step } = Steps

export const Register = () => {
  return (
    <RegisterContextProvider>
      <RegisterContent />
    </RegisterContextProvider>
  )
}

const RegisterContent = () => {
  const { step } = useRegisterContext()

  const steps = [
    {
      title: 'Contact',
      content: <Contact />,
    },
    {
      title: 'Movies',
      content: <Movie />,
    },
    {
      title: 'Music',
      content: <Music />,
    },
    {
      title: 'Travel',
      content: <Travel />,
    },
    {
      title: 'Review',
      content: <Review />,
    },
  ]

  return (
    <div className='register-container'>
      <Row justify='center'>
        <Col span='10'>
          <div className='fs-150 pb-300 text-center'>
            <span>Please complete the registration form below</span>
          </div>
          <Steps current={step}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          {steps[step].content}
        </Col>
      </Row>
    </div>
  )
}
