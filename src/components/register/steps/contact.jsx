import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, Row, Col, AutoComplete } from 'antd'
import { validateZip } from 'components/_siteWide/form/validators/validateZip'
import { validatePhone } from 'components/_siteWide/form/validators/validatePhone'
import { validateEmail } from 'components/_siteWide/form/validators/validateEmail'
import { FormItem } from 'components/_siteWide/form/formItem'
import { states } from 'data/states'
import { setClean, setContact, getState, nextStep } from 'store/slices/registerSlice'
import { Actions } from './actions'

const inputField = FormItem(Input)
const autocompleteField = FormItem(AutoComplete)

const Contact = () => {
  const state = useSelector(getState)
  const dispatch = useDispatch()

  const statesValues = [...new Set(states.map((s) => s).sort())].map((v) => {
    return { value: v.value }
  })

  const [filteredStates, setFilteredState] = useState(statesValues)

  const contact = state.contact
  const clean = state.clean
  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      onFinish={() => {
        dispatch(setClean(false))
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
                initialValues={clean}
                autoFocus
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
                initialValues={clean}
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
                initialValues={clean}
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
                initialValues={clean}
                required
                hasFeedback
              />
            </Col>
            <Col span={6} className='pl-100 pt-050'>
              <Field
                name='State'
                defaultValue={contact.State}
                component={autocompleteField}
                onChange={(value) => dispatch(setContact({ ...contact, State: value }))}
                onSearch={(value) => {
                  if (value) {
                    const matches = states.filter((s) =>
                      s.value.toLowerCase().trim().includes(value.toLowerCase().trim())
                    )
                    setFilteredState(matches)
                  } else {
                    setFilteredState(states)
                  }
                }}
                options={filteredStates}
                initialValues={clean}
                required
                hasFeedback
              />
            </Col>
            <Col span={6} className='pl-100 pt-050'>
              <Field
                name='Zip'
                defaultValue={contact.Zip}
                component={inputField}
                onChange={(e) => dispatch(setContact({ ...contact, Zip: e.target.value }))}
                initialValues={clean}
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
                initialValues={clean}
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
                initialValues={clean}
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
