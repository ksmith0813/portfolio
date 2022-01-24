import React from 'react'
import { Row, Col, Form } from 'antd'
import { FormInput } from 'components/_siteWide/form/formInput'
import { FormSelect } from 'components/_siteWide/form/formSelect'
import { useRegisterContext } from '../context/registerContext'
import { Actions } from './actions'
import { countries } from 'constants/countries'
import { FormAutoComplete } from 'components/_siteWide/form/formAutoComplete'

export const Travel = () => {
  const { travel, setTravel, nextStep } = useRegisterContext()
  const [form] = Form.useForm()
  return (
    <Form form={form} onFinish={() => nextStep()} onFinishFailed={() => nextStep()}>
      <div className='steps-content'>
        <Col span={14}>
          <Row>
            <Col span={24} className='fs-200 text-center'>
              Travel Info
            </Col>
            <Col span={24} className='pt-200'>
              <FormAutoComplete
                name='FavoriteCountry'
                initialValue={travel.FavoriteCountry}
                element={travel}
                setElement={setTravel}
                options={countries}
                required
                focus
              />
            </Col>
            <Col span={24} className='pt-200'>
              <FormInput
                name='FavoriteCity'
                initialValue={travel.FavoriteCity}
                element={travel}
                setElement={setTravel}
                required
              />
            </Col>
            <Col span={24} className='pt-050'>
              <FormSelect
                name='PlacesVisited'
                initialValue={travel.PlacesVisited}
                element={travel}
                setElement={setTravel}
                options={countries}
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
