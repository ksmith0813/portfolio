import React from 'react'
import { Form, Row, Col } from 'antd'
import { states } from 'constants/states'
import { FormInput } from 'components/_siteWide/form/formInput'
import { FormSelect } from 'components/_siteWide/form/formSelect'
import { useRegisterContext } from '../context/registerContext'
import { Actions } from './actions'

export const Contact = () => {
  const { contact, setContact, nextStep, handleErrors } = useRegisterContext()
  const [form] = Form.useForm()

  return (
    <Form form={form} onFinish={(data) => nextStep(data)} onFinishFailed={(errors) => handleErrors(contact, errors)}>
      <div className='steps-content'>
        <Col span={13}>
          <Row>
            <Col span={24}>
              <FormInput
                name='FirstName'
                initialValue={contact.FirstName}
                element={contact}
                setElement={setContact}
                required
              />
            </Col>
            <Col span={24}>
              <FormInput
                name='LastName'
                initialValue={contact.LastName}
                element={contact}
                setElement={setContact}
                required
              />
            </Col>
            <Col span={24}>
              <FormInput
                name='Address'
                initialValue={contact.Address}
                element={contact}
                setElement={setContact}
                required
              />
            </Col>
            <Col span={24}>
              <FormInput
                name='Address2'
                label='Apt #'
                initialValue={contact.Address2}
                element={contact}
                setElement={setContact}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormInput name='City' initialValue={contact.City} element={contact} setElement={setContact} required />
            </Col>
            <Col span={6} className='pl-100'>
              <FormSelect
                name='State'
                initialValue={contact.State}
                element={contact}
                setElement={setContact}
                options={states}
                required
              />
            </Col>
            <Col span={6} className='pl-100'>
              <FormInput name='Zip' initialValue={contact.Zip} element={contact} setElement={setContact} required />
            </Col>
            <Col span={12}>
              <FormInput name='Phone' initialValue={contact.Phone} element={contact} setElement={setContact} required />
            </Col>
            <Col span={24}>
              <FormInput name='Email' initialValue={contact.Email} element={contact} setElement={setContact} required />
            </Col>
          </Row>
        </Col>
      </div>
      <Actions form={form} />
    </Form>
  )
}
