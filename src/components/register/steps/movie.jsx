import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, Select, Row, Col } from 'antd'
import { FormItem } from 'components/_siteWide/form/formItem'
import { movieGenres } from 'constants/movieGenres'
import { setClean, setMovie, getState, nextStep } from 'store/slices/registerSlice'
import { Actions } from './actions'

const { Option } = Select
const inputField = FormItem(Input)
const selectField = FormItem(Select)

const Movie = () => {
  const state = useSelector(getState)
  const dispatch = useDispatch()
  const movie = state.movie
  const clean = state.clean
  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      onFinish={() => {
        dispatch(setClean(false))
        dispatch(nextStep(movie))
      }}
    >
      <div className='steps-content'>
        <Col span={14}>
          <Row>
            <Col span={24} className='fs-200 text-center'>
              Movie Info
            </Col>
            <Col span={24} className='pt-200'>
              <Field
                name='FavoriteMovie'
                defaultValue={movie.FavoriteMovie}
                component={inputField}
                onChange={(e) => dispatch(setMovie({ ...movie, FavoriteMovie: e.target.value }))}
                initialValues={clean}
                required
                hasFeedback
              />
            </Col>
            <Col span={24} className='pt-050'>
              <Field
                name='FavoriteGenres'
                defaultValue={movie.FavoriteGenres}
                component={selectField}
                onChange={(value) => dispatch(setMovie({ ...movie, FavoriteGenres: value }))}
                initialValues={clean}
                mode='multiple'
                required
                hasFeedback
              >
                {movieGenres.map((s) => (
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
  form: 'movie',
})(Movie)
