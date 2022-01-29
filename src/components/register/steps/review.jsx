import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Form, Tag, Card } from 'antd'
import { UserOutlined, VideoCameraOutlined, AudioOutlined, CarOutlined } from '@ant-design/icons'
import { DataItem } from 'components/_siteWide/layout/dataItem'
import { getState, nextStep } from 'store/slices/registerSlice'
import { Actions } from './actions'

export const Review = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  return (
    <Form form={form} onFinish={() => dispatch(nextStep())}>
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
  const state = useSelector(getState)
  const contact = state.contact
  return (
    <Card
      title={
        <>
          <UserOutlined className='card-title-icon' color='blue'></UserOutlined>
          <span className='pl-150'>Contact</span>
        </>
      }
      className='section'
    >
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
        {contact.Apt && (
          <Col className='p-100'>
            <DataItem label='APT #' children={contact.Apt} />
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
    </Card>
  )
}

const MovieContent = () => {
  const state = useSelector(getState)
  const movie = state.movie
  return (
    <Card
      title={
        <>
          <VideoCameraOutlined className='card-title-icon' color='blue'></VideoCameraOutlined>
          <span className='pl-150'>Movies</span>
        </>
      }
      className='section'
    >
      <Row>
        <Col className='p-100'>
          <DataItem label='Favorite Movie' children={movie.FavoriteMovie} />
        </Col>
      </Row>
      <Row>
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
    </Card>
  )
}

const MusicContent = () => {
  const state = useSelector(getState)
  const music = state.music
  return (
    <Card
      title={
        <>
          <AudioOutlined className='card-title-icon' color='blue'></AudioOutlined>
          <span className='pl-150'>Music</span>
        </>
      }
      className='section'
    >
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
    </Card>
  )
}

const TravelContent = () => {
  const state = useSelector(getState)
  const travel = state.travel
  return (
    <Card
      title={
        <>
          <CarOutlined className='card-title-icon' color='blue'></CarOutlined>
          <span className='pl-150'>Travel</span>
        </>
      }
      className='section'
    >
      <Row>
        <Col className='p-100'>
          <DataItem
            label='Favorite Countries'
            children={travel.FavoriteCountries.map((g, i) => (
              <Tag color='blue' key={i} className='item-tag-list'>
                {g}
              </Tag>
            ))}
          />
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
    </Card>
  )
}
