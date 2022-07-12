import React from 'react'
import { useSelector } from 'react-redux'
import { Steps, Row, Col } from 'antd'
import { getState as getRegisterState } from 'store/slices/registerSlice'
import { StepContent } from './steps/stepContent'
import './register.scss'

const { Step } = Steps

export const Register = () => {
  const state = useSelector(getRegisterState)
  const step = state.step
  const steps = StepContent()

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
