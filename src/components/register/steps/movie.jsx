import React from 'react'
import { Form } from 'antd'
import { useRegisterContext } from '../context/registerContext'

export const Movie = () => {
  const { movie, setMovie } = useRegisterContext()
  const [form] = Form.useForm()
  form.setFieldsValue({ ...movie })
  return <Form form={form}></Form>
}