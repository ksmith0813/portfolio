import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'antd'
import { getState as getMediaState, setSelectedId } from 'store/slices/mediaSlice'
import { MediaType } from './mediaType'

export const MediaList = () => {
  const dispatch = useDispatch()
  const state = useSelector(getMediaState)
  const data = state.data

  const getMedia = (id) => dispatch(setSelectedId(id))

  return (
    <>
      <div className='media-list-items'>
        <Row className='p-100 header-row'>
          <Col span={16}>
            <b>Title</b>
          </Col>
          <Col span={4} className='pl-050'>
            <b>Year</b>
          </Col>
          <Col span={4} className='pl-050'>
            <b>Type</b>
          </Col>
        </Row>
        {data.map((t, i) => (
          <Row key={i} className='p-100 clickable-rows' onClick={() => getMedia(t.imdbID)}>
            <Col span={16}>{t.Title}</Col>
            <Col span={4} className='pl-050'>
              {t.Year}
            </Col>
            <Col span={4} className='pl-050 capitalize'>
              <MediaType type={t.Type} />
            </Col>
          </Row>
        ))}
      </div>
      <Row justify='center' className='pt-150 fs-150 medium-text'>
        {data.length} Result{data.length > 0 ? 's' : ''} Found
      </Row>
    </>
  )
}
