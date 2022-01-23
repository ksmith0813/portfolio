import React from 'react'
import { Form } from 'antd'
import { useRegisterContext } from '../context/registerContext'
import { Actions } from './actions'

export const Music = () => {
  const { music, nextStep, handleErrors } = useRegisterContext()
  const [form] = Form.useForm()
  form.setFieldsValue({ ...music })
  return (
    <Form form={form} onFinish={(data) => nextStep(data)} onFinishFailed={(errors) => handleErrors(music, errors)}>
      <div className='steps-content'></div>
      <Actions form={form} />
    </Form>
  )
}