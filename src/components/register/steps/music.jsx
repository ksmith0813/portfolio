import React from 'react'
import { Form } from 'antd'
import { useRegisterContext } from '../context/registerContext'
import { Actions } from './actions'

export const Music = () => {
  const { nextStep } = useRegisterContext()
  const [form] = Form.useForm()
  return (
    <Form form={form} onFinish={(data) => nextStep(data)}>
      <div className='steps-content'></div>
      <Actions form={form} />
    </Form>
  )
}