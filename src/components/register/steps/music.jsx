import React from 'react'
import { Row, Col, Form } from 'antd'
import { FormInput } from 'components/_siteWide/form/formInput'
import { FormSelect } from 'components/_siteWide/form/formSelect'
import { useRegisterContext } from '../context/registerContext'
import { instruments } from 'constants/instruments'
import { Actions } from './actions'

export const Music = () => {
  const { music, setMusic, nextStep } = useRegisterContext()
  const [form] = Form.useForm()
  return (
    <Form form={form} onFinish={() => nextStep()}>
      <div className='steps-content'>
        <Col span={14}>
          <Row>
            <Col span={24} className='fs-200 text-center'>
              Music Info
            </Col>
            <Col span={24} className='pt-200'>
              <FormInput
                name='FavoriteBand'
                initialValue={music.FavoriteBand}
                element={music}
                setElement={setMusic}
                required
              />
            </Col>
            <Col span={24} className='pt-200'>
              <FormInput
                name='FavoriteSong'
                initialValue={music.FavoriteSong}
                element={music}
                setElement={setMusic}
                required
              />
            </Col>
            <Col span={24} className='pt-050'>
              <FormSelect
                name='Instruments'
                initialValue={music.Instruments}
                element={music}
                setElement={setMusic}
                options={instruments}
                mode='multiple'
              />
            </Col>
            <Col span={24} className='pt-200'>
              <FormInput
                name='SoundCloud'
                label='SoundCloud'
                initialValue={music.SoundCloud}
                element={music}
                setElement={setMusic}
              />
            </Col>
          </Row>
        </Col>
      </div>
      <Actions form={form} />
    </Form>
  )
}
