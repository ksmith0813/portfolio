import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, Select, Row, Col } from 'antd'
import { FormItem } from 'components/_siteWide/form/formItem'
import { countries } from 'data/dropDowns/countries'
import { setClean, setTravel, getState, nextStep } from 'store/slices/registerSlice'
import { Actions } from './actions'

const { Option } = Select
const inputField = FormItem(Input)
const selectField = FormItem(Select)

const Travel = () => {
  const state = useSelector(getState)
  const dispatch = useDispatch()
  const travel = state.travel
  const clean = state.clean
  const [form] = Form.useForm()
  return (
    <Form
      form={form}
      onFinish={() => {
        dispatch(setClean(false))
        dispatch(nextStep(travel))
      }}
    >
      <div className='steps-content'>
        <Col span={14}>
          <Row>
            <Col span={24} className='fs-200 text-center'>
              Travel Info
            </Col>
            <Col span={24} className='pt-200'>
              <Field
                name='FavoriteCountries'
                defaultValue={travel.FavoriteCountries}
                component={selectField}
                onChange={(value) => dispatch(setTravel({ ...travel, FavoriteCountries: value }))}
                initialValues={clean}
                autoFocus
                mode='multiple'
                required
                hasFeedback
              >
                {countries.map((s) => (
                  <Option key={s.value} value={s.value}>
                    {s.value}
                  </Option>
                ))}
              </Field>
            </Col>
            <Col span={24} className='pt-050'>
              <Field
                name='FavoriteCity'
                defaultValue={travel.FavoriteCity}
                component={inputField}
                onChange={(e) => dispatch(setTravel({ ...travel, FavoriteCity: e.target.value }))}
                initialValues={clean}
                required
                hasFeedback
              />
            </Col>
            <Col span={24} className='pt-050'>
              <Field
                name='PlacesVisited'
                defaultValue={travel.PlacesVisited}
                component={selectField}
                onChange={(value) => dispatch(setTravel({ ...travel, PlacesVisited: value }))}
                initialValues={clean}
                mode='multiple'
                hasFeedback
              >
                {countries.map((s) => (
                  <Option key={s.value} value={s.value}>
                    {s.value}
                  </Option>
                ))}
              </Field>
            </Col>
          </Row>
        </Col>
      </div>
      <Actions form={form} />
    </Form>
  )
}

export default reduxForm({
  form: 'travel',
})(Travel)
