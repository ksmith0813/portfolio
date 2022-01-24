import React from 'react'
import { Row, Col, Form, Tag } from 'antd'
import { useRegisterContext } from '../context/registerContext'
import { Actions } from './actions'
import { DataItem } from 'components/_siteWide/layout/dataItem'

export const Review = () => {
  const { nextStep } = useRegisterContext()
  const [form] = Form.useForm()
  return (
    <Form form={form} onFinish={() => nextStep()}>
      <div className='steps-content'>
        <Col span={14}>
          <Row>
            <Col span={24} className='fs-200 text-center'>
              Review Info
            </Col>
          </Row>
          <ContactContent />
          <MovieContent />
          <MusicContent />
          <TravelContent />
        </Col>
      </div>
      <Actions form={form} />
    </Form>
  )
}

const ContactContent = () => {
  const { contact } = useRegisterContext()
  return (
    <div className='section'>
      <Row>
        <Col className='fs-125 p-075 medium-text'>Contact</Col>
      </Row>
      <Row>
        <Col className='p-100'>
          <DataItem label='First Name' children={contact.FirstName} />
        </Col>
        <Col className='p-100'>
          <DataItem label='Last Name' children={contact.LastName} />
        </Col>
      </Row>
      <Row>
        <Col className='p-100'>
          <DataItem label='Address' children={contact.Address} />
        </Col>
        {contact.Address2 && (
          <Col className='p-100'>
            <DataItem label='APT #' children={contact.Address2} />
          </Col>
        )}
      </Row>
      <Row>
        <Col className='p-100'>
          <DataItem label='City' children={contact.City} />
        </Col>
        <Col className='p-100'>
          <DataItem label='State' children={contact.State} />
        </Col>
        <Col className='p-100'>
          <DataItem label='Zip' children={contact.Zip} />
        </Col>
      </Row>
      <Row>
        <Col className='p-100'>
          <DataItem label='Phone' children={contact.Phone} />
        </Col>
        <Col className='p-100'>
          <DataItem label='Email' children={contact.Email} />
        </Col>
      </Row>
    </div>
  )
}

const MovieContent = () => {
  const { movie } = useRegisterContext()
  return (
    <div className='section'>
      <Row>
        <Col className='fs-125 p-075 medium-text'>Movies</Col>
      </Row>
      <Row>
        <Col className='p-100'>
          <DataItem label='Favorite Movie' children={movie.FavoriteMovie} />
        </Col>
        <Col className='p-100'>
          <DataItem
            label='Favorite Genres'
            children={movie.FavoriteGenres.map((g, i) => (
              <Tag color='blue' key={i} className='item-tag-list'>
                {g}
              </Tag>
            ))}
          />
        </Col>
      </Row>
    </div>
  )
}

const MusicContent = () => {
  const { music } = useRegisterContext()
  return (
    <div className='section'>
      <Row>
        <Col className='fs-125 p-075 medium-text'>Music</Col>
      </Row>
      <Row>
        <Col className='p-100'>
          <DataItem label='Favorite Band' children={music.FavoriteBand} />
        </Col>
        <Col className='p-100'>
          <DataItem label='Favorite Song' children={music.FavoriteSong} />
        </Col>
      </Row>
      <Row>
        <Col className='p-100'>
          <DataItem
            label='Instruments'
            children={music.Instruments.map((g, i) => (
              <Tag color='blue' key={i} className='item-tag-list'>
                {g}
              </Tag>
            ))}
          />
        </Col>
      </Row>
      <Row>
        <Col className='p-100'>
          <DataItem label='SoundCloud' children={music.SoundCloud} />
        </Col>
      </Row>
    </div>
  )
}

const TravelContent = () => {
  const { travel } = useRegisterContext()
  return (
    <div className='section'>
      <Row>
        <Col className='fs-125 p-075 medium-text'>Travel</Col>
      </Row>
      <Row>
        <Col className='p-100'>
          <DataItem label='Favorite Country' children={travel.FavoriteCountry} />
        </Col>
        <Col className='p-100'>
          <DataItem label='Favorite City' children={travel.FavoriteCity} />
        </Col>
      </Row>
      <Row>
        <Col className='p-100'>
          <DataItem
            label='Places Visited'
            children={travel.PlacesVisited.map((g, i) => (
              <Tag color='blue' key={i} className='item-tag-list'>
                {g}
              </Tag>
            ))}
          />
        </Col>
      </Row>
    </div>
  )
}
