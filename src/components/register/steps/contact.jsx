import React from 'react'
import { Form } from 'antd'
import { useRegisterContext } from '../context/registerContext'

export const Contact = () => {
  const { contact, setContact } = useRegisterContext()
  const [form] = Form.useForm()
  form.setFieldsValue({ ...contact })
  return <Form form={form}></Form>
}
