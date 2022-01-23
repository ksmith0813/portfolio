import React from 'react'
import { Form } from 'antd'
import { useRegisterContext } from '../context/registerContext'

export const Music = () => {
  const { music, setMusic } = useRegisterContext()
  const [form] = Form.useForm()
  form.setFieldsValue({ ...music })
  return <Form form={form}></Form>
}