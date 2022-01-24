import React from 'react'
import { Row, Col, Form } from 'antd'
import { FormInput } from 'components/_siteWide/form/formInput'
import { FormSelect } from 'components/_siteWide/form/formSelect'
import { movieGenres } from 'constants/movieGenres'
import { useRegisterContext } from '../context/registerContext'
import { Actions } from './actions'

export const Movie = () => {
  const { movie, setMovie, nextStep } = useRegisterContext()
  const [form] = Form.useForm()
  return (
    <Form form={form} onFinish={() => nextStep()}>
      <div className='steps-content'>
        <Col span={14}>
          <Row>
            <Col span={24} className='fs-200 text-center'>
              Movie Info
            </Col>
            <Col span={24} className='pt-200'>
              <FormInput
                name='FavoriteMovie'
                initialValue={movie.FavoriteMovie}
                element={movie}
                setElement={setMovie}
                required
              />
            </Col>
            <Col span={24} className='pt-050'>
              <FormSelect
                name='FavoriteGenres'
                initialValue={movie.FavoriteGenres}
                element={movie}
                setElement={setMovie}
                options={movieGenres}
                required
                mode='multiple'
              />
            </Col>
          </Row>
        </Col>
      </div>
      <Actions form={form} />
    </Form>
  )
}
