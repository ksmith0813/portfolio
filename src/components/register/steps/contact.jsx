import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, Select, Row, Col } from 'antd'
import { validateZip } from 'components/_siteWide/form/validators/validateZip'
import { validatePhone } from 'components/_siteWide/form/validators/validatePhone'
import { validateEmail } from 'components/_siteWide/form/validators/validateEmail'
import { FormItem } from 'components/_siteWide/form/formItem'
import { states } from 'constants/states'
import { setContact, getState, nextStep } from 'store/slices/registerSlice'
import { Actions } from './actions'

const { Option } = Select
const inputField = FormItem(Input)
const selectField = FormItem(Select)

const Contact = () => {
  const [initial, setInitial] = useState(true)
  const state = useSelector(getState)
  const dispatch = useDispatch()
  const contact = state.contact
  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      onFinish={() => {
        setInitial(false)
        dispatch(nextStep(contact))
      }}
    >
      <div className='steps-content'>
        <Col span={14}>
          <Row>
            <Col span={24} className='fs-200 text-center'>
              Contact Info
            </Col>
            <Col span={24} className='pt-200'>
              <Field
                name='FirstName'
                defaultValue={contact.FirstName}
                component={inputField}
                onChange={(e) => dispatch(setContact({ ...contact, FirstName: e.target.value }))}
                initialValues={initial}
                required
                hasFeedback
              />
            </Col>
            <Col span={24} className='pt-050'>
              <Field
                name='LastName'
                defaultValue={contact.LastName}
                component={inputField}
                onChange={(e) => dispatch(setContact({ ...contact, LastName: e.target.value }))}
                initialValues={initial}
                required
                hasFeedback
              />
            </Col>
            <Col span={24} className='pt-050'>
              <Field
                name='Address'
                defaultValue={contact.Address}
                component={inputField}
                onChange={(e) => dispatch(setContact({ ...contact, Address: e.target.value }))}
                initialValues={initial}
                required
                hasFeedback
              />
            </Col>
            <Col span={12} className='pt-050'>
              <Field
                name='Apt'
                defaultValue={contact.Apt}
                component={inputField}
                onChange={(e) => dispatch(setContact({ ...contact, Apt: e.target.value }))}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12} className='pt-050'>
              <Field
                name='City'
                defaultValue={contact.City}
                component={inputField}
                onChange={(e) => dispatch(setContact({ ...contact, City: e.target.value }))}
                initialValues={initial}
                required
                hasFeedback
              />
            </Col>
            <Col span={6} className='pl-100 pt-050'>
              <Field
                name='State'
                defaultValue={contact.State}
                component={selectField}
                onChange={(value) => dispatch(setContact({ ...contact, State: value }))}
                initialValues={initial}
                required
                hasFeedback
              >
                {states.map((s) => (
                  <Option key={s.code} value={s.value}>
                    {s.value}
                  </Option>
                ))}
              </Field>
            </Col>
            <Col span={6} className='pl-100 pt-050'>
              <Field
                name='Zip'
                defaultValue={contact.Zip}
                component={inputField}
                onChange={(e) => dispatch(setContact({ ...contact, Zip: e.target.value }))}
                initialValues={initial}
                validator={validateZip}
                required
                hasFeedback
              />
            </Col>
            <Col span={12} className='pt-050'>
              <Field
                name='Phone'
                defaultValue={contact.Phone}
                component={inputField}
                onChange={(e) => dispatch(setContact({ ...contact, Phone: e.target.value }))}
                initialValues={initial}
                validator={validatePhone}
                required
                hasFeedback
              />
            </Col>
            <Col span={24} className='pt-050'>
              <Field
                name='Email'
                defaultValue={contact.Email}
                component={inputField}
                onChange={(e) => dispatch(setContact({ ...contact, Email: e.target.value }))}
                initialValues={initial}
                validator={validateEmail}
                required
                hasFeedback
              />
            </Col>
          </Row>
        </Col>
      </div>
      <Actions form={form} />
    </Form>
  )
}

export default reduxForm({
  form: 'contact',
})(Contact)
