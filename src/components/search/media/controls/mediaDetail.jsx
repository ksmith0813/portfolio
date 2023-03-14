import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Progress, Button, Tag } from 'antd'
import { NoData } from 'components/_siteWide/layout/layout'
import { setSelectedId, setSelectedMedia } from 'store/slices/mediaSlice'
import { DataItem } from 'components/_siteWide/layout/layout'
import moment from 'moment'

export const MediaDetail = () => {
  const state = useSelector((state) => state.media)
  const dispatch = useDispatch()

  const backToAll = () => {
    dispatch(setSelectedId(null))
    dispatch(setSelectedMedia(null))
  }

  const getRating = (rating) => {
    let value
    if (rating.includes('/')) {
      const values = rating.split('/')
      const scale = parseInt(values[1])
      value = parseFloat(values[0]) * (scale === 10 ? 10 : 1)
    } else if (rating.includes('%')) {
      value = parseFloat(rating.split('%')[0])
    }

    return value
  }

  const selectedMedia = state.selectedMedia
  const hasRatings = selectedMedia.Ratings.length > 0

  return (
    <div className='media-detail'>
      <Row className='border-bottom-light pb-150'>
        <Col className='fs-150' flex={1}>
          {selectedMedia.Title}
        </Col>
        <Col>
          <Button type='primary' onClick={() => backToAll()}>
            Back to All
          </Button>
        </Col>
      </Row>
      <Row className='pt-200'>
        <Col>
          {selectedMedia.Poster !== 'N/A' && <img src={selectedMedia.Poster} className='media-poster' alt='' />}
          {selectedMedia.Poster === 'N/A' && <NoData message='Poster not available' />}
        </Col>
        <Col span={9} className='pl-200'>
          <DataItem label='Plot' children={selectedMedia.Plot} />
          <DataItem
            label='Release Year'
            children={moment(selectedMedia.Released).format('MM/DD/YYYY')}
            labelClasses='pt-100'
          />
          <DataItem label='Director' children={selectedMedia.Director} labelClasses='pt-100' />
          <DataItem label='Actors' children={selectedMedia.Actors} labelClasses='pt-100' />
          <DataItem label='Writers' children={selectedMedia.Writer} labelClasses='pt-100' />
          <DataItem
            label='Genre'
            children={selectedMedia.Genre.split(',').map((g) => (
              <Tag key={g}>{g}</Tag>
            ))}
            labelClasses='pt-100'
          />
          <DataItem label='Rated' children={selectedMedia.Rated} labelClasses='pt-100' />
        </Col>
        <Col span={8} className='pl-200'>
          {hasRatings && (
            <>
              <b>Ratings</b>
              {selectedMedia.Ratings.map((r) => (
                <DataItem
                  key={r.Source}
                  label={r.Source === 'Internet Movie Database' ? 'IMDB' : r.Source}
                  children={<Progress percent={getRating(r.Value)} />}
                  labelClasses='pt-150 light-text'
                />
              ))}
            </>
          )}
          <DataItem
            label='Box Office'
            children={selectedMedia.BoxOffice}
            labelClasses={hasRatings ? 'pt-200' : ''}
            childrenClasses='fs-150'
          />
          <DataItem label='Awards' children={selectedMedia.Awards} labelClasses='pt-100' />
          <DataItem label='Runtime' children={selectedMedia.Runtime} labelClasses='pt-100' />
        </Col>
      </Row>
    </div>
  )
}
