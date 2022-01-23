import React from 'react'
import { Form } from 'antd'
import { useRegisterContext } from '../context/registerContext'

export const Travel = () => {
  const { travel, setTravel } = useRegisterContext()
  const [form] = Form.useForm()
  form.setFieldsValue({ ...travel })
  return <Form form={form}></Form>
}