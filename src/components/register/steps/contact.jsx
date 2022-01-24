import React from 'react'
import { Form, Row, Col } from 'antd'
import { states } from 'constants/states'
import { FormInput } from 'components/_siteWide/form/formInput'
import { FormSelect } from 'components/_siteWide/form/formSelect'
import { validateZip } from 'components/_siteWide/form/validators/validateZip'
import { validatePhone } from 'components/_siteWide/form/validators/validatePhone'
import { validateEmail } from 'components/_siteWide/form/validators/validateEmail'
import { useRegisterContext } from '../context/registerContext'
import { Actions } from './actions'

export const Contact = () => {
  const { contact, setContact, nextStep } = useRegisterContext()
  const [form] = Form.useForm()
  return (
    <Form form={form} onFinish={() => nextStep()}>
      <div className='steps-content'>
        <Col span={14}>
          <Row>
            <Col span={24} className='fs-200 text-center'>
              Contact Info
            </Col>
            <Col span={24} className='pt-200'>
              <FormInput
                name='FirstName'
                initialValue={contact.FirstName}
                element={contact}
                setElement={setContact}
                required
              />
            </Col>
            <Col span={24} className='pt-050'>
              <FormInput
                name='LastName'
                initialValue={contact.LastName}
                element={contact}
                setElement={setContact}
                required
              />
            </Col>
            <Col span={24} className='pt-050'>
              <FormInput
                name='Address'
                initialValue={contact.Address}
                element={contact}
                setElement={setContact}
                required
              />
            </Col>
            <Col span={24} className='pt-050'>
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
            <Col span={12} className='pt-050'>
              <FormInput name='City' initialValue={contact.City} element={contact} setElement={setContact} required />
            </Col>
            <Col span={6} className='pl-100 pt-050'>
              <FormSelect
                name='State'
                initialValue={contact.State}
                element={contact}
                setElement={setContact}
                options={states}
                required
              />
            </Col>
            <Col span={6} className='pl-100 pt-050'>
              <FormInput
                name='Zip'
                initialValue={contact.Zip}
                element={contact}
                setElement={setContact}
                validator={validateZip}
                required
              />
            </Col>
            <Col span={12}>
              <FormInput
                name='Phone'
                initialValue={contact.Phone}
                element={contact}
                setElement={setContact}
                validator={validatePhone}
                required
              />
            </Col>
            <Col span={24} className='pt-050'>
              <FormInput
                name='Email'
                initialValue={contact.Email}
                element={contact}
                setElement={setContact}
                validator={validateEmail}
                required
              />
            </Col>
          </Row>
        </Col>
      </div>
      <Actions form={form} />
    </Form>
  )
}
