import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, Select, Row, Col } from 'antd'
import { FormItem } from 'components/_siteWide/form/formItem'
import { instruments } from 'constants/instruments'
import { setClean, setMusic, getState, nextStep } from 'store/slices/registerSlice'
import { Actions } from './actions'

const { Option } = Select
const inputField = FormItem(Input)
const selectField = FormItem(Select)

const Music = () => {
  const state = useSelector(getState)
  const dispatch = useDispatch()
  const music = state.music
  const clean = state.clean
  const [form] = Form.useForm()
  return (
    <Form
      form={form}
      onFinish={() => {
        dispatch(setClean(false))
        dispatch(nextStep(music))
      }}
    >
      <div className='steps-content'>
        <Col span={14}>
          <Row>
            <Col span={24} className='fs-200 text-center'>
              Music Info
            </Col>
            <Col span={24} className='pt-200'>
              <Field
                name='FavoriteBand'
                defaultValue={music.FavoriteBand}
                component={inputField}
                onChange={(e) => dispatch(setMusic({ ...music, FavoriteBand: e.target.value }))}
                initialValues={clean}
                required
                hasFeedback
              />
            </Col>
            <Col span={24} className='pt-050'>
              <Field
                name='FavoriteSong'
                defaultValue={music.FavoriteSong}
                component={inputField}
                onChange={(e) => dispatch(setMusic({ ...music, FavoriteSong: e.target.value }))}
                initialValues={clean}
                required
                hasFeedback
              />
            </Col>
            <Col span={24} className='pt-050'>
              <Field
                name='Instruments'
                defaultValue={music.Instruments}
                component={selectField}
                onChange={(value) => dispatch(setMusic({ ...music, Instruments: value }))}
                initialValues={clean}
                mode='multiple'
                hasFeedback
              >
                {instruments.map((s) => (
                  <Option key={s.value} value={s.value}>
                    {s.value}
                  </Option>
                ))}
              </Field>
            </Col>
            <Col span={24} className='pt-050'>
              <Field
                name='SoundCloud'
                defaultValue={music.SoundCloud}
                component={inputField}
                onChange={(e) => dispatch(setMusic({ ...music, SoundCloud: e.target.value }))}
                initialValues={clean}
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
  form: 'music',
})(Music)
