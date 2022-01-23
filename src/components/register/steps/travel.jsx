import React from 'react'
import { Form } from 'antd'
import { useRegisterContext } from '../context/registerContext'
import { Actions } from './actions'

export const Travel = () => {
  const { travel, nextStep, handleErrors } = useRegisterContext()
  const [form] = Form.useForm()
  form.setFieldsValue({ ...travel })
  return (
    <Form form={form} onFinish={(data) => nextStep(data)} onFinishFailed={(errors) => handleErrors(travel, errors)}>
      <div className='steps-content'></div>
      <Actions form={form} />
    </Form>
  )
}
