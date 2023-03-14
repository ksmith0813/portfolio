import React from 'react'
import { useSelector } from 'react-redux'
import { Steps, Row, Col } from 'antd'
import { StepContent } from './steps/stepContent'
import './register.scss'

export const Register = () => {
  const step = useSelector((state) => state.register.step)
  const steps = StepContent()

  return (
    <div className='register-container'>
      <Row justify='center'>
        <Col span={11}>
          <Row justify='center' className='fs-175 pb-200'>
            Please complete the registration form below
          </Row>
          <Row className='steps-header'>
            <Steps current={step} items={steps} />
          </Row>
          {steps[step].content}
        </Col>
      </Row>
    </div>
  )
}
