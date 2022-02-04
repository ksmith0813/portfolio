import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Spin, Col, Row, Progress, Button } from 'antd'
import { NoData } from 'components/_siteWide/layout/layout'
import { getState, setLoading, setSearch, setData, setSelectedId, setSelectedMedia } from 'store/slices/mediaSlice'
import api from 'utils/api'
import { DataItem } from 'components/_siteWide/layout/layout'
import moment from 'moment'
import movie from 'assets/movie-active.svg'
import tv from 'assets/tv.svg'
import game from 'assets/game.svg'
import './media.scss'

export const Media = () => {
  const state = useSelector(getState)
  const dispatch = useDispatch()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (state.selectedMedia) return
      if (state.search) {
        dispatch(setLoading(true))
        api.getMovies(state.search).then(({ data }) => {
          if (data.Search) {
            dispatch(setData([...new Set(data.Search)]))
          } else {
            dispatch(setData([]))
            dispatch(setSelectedMedia(null))
          }

          dispatch(setLoading(false))
        })
      } else {
        dispatch(setData([]))
        dispatch(setSelectedMedia(null))
      }
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [state.search, state.selectedMedia, dispatch])

  useEffect(() => {
    if (!state.selectedId) return
    api.getMovie(state.selectedId).then(({ data }) => {
      dispatch(setLoading(true))
      dispatch(setSelectedMedia(data))
      dispatch(setLoading(false))
    })
  }, [state.selectedId, dispatch])

  const onSearchChange = (e) => {
    dispatch(setSearch(e.target.value || ''))
    dispatch(setSelectedMedia(null))
  }

  const getMedia = (id) => dispatch(setSelectedId(id))

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

  const loading = state.loading
  const data = state.data
  const selectedMedia = state.selectedMedia

  return (
    <div className='page justify-center'>
      <Col span={24}>
        <Row className='fs-125'>Media Search</Row>
        <Row className='pt-200'>
          <Input
            onChange={onSearchChange}
            value={state.search}
            placeholder='You can search for your favorite movie, TV show, or video game you really enjoyed playing.'
            allowClear
          />
        </Row>
        <div className={`media-list-container ${loading || !data.length ? 'content-center' : ''}`}>
          {loading && <Spin className='pt-200' />}
          {!loading && !data.length && !selectedMedia && <NoData />}
          {!loading && data.length > 0 && !selectedMedia && <MediaList data={data} getMedia={getMedia} />}
          {!loading && selectedMedia && (
            <MediaDetail selectedMedia={selectedMedia} getRating={getRating} backToAll={backToAll} />
          )}
        </div>
      </Col>
    </div>
  )
}

const MediaList = ({ data, getMedia }) => (
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
  </>
)

const MediaDetail = ({ selectedMedia, getRating, backToAll }) => {
  const hasRatings = selectedMedia.Ratings.length > 0

  return (
    <div>
      <Row className='media-detail'>
        <Col flex={1}>{selectedMedia.Title}</Col>
        <Col>
          <Button type='primary' onClick={() => backToAll()}>
            Back to All
          </Button>
        </Col>
      </Row>
      <Row className='pt-200'>
        <Col span={7}>
          {selectedMedia.Poster !== 'N/A' && (
            <img src={selectedMedia.Poster} className='media-poster box-shadow' alt='' />
          )}
          {selectedMedia.Poster === 'N/A' && <NoData message='Poster not available' />}
        </Col>
        <Col span={9}>
          <DataItem label='Plot' children={selectedMedia.Plot} />
          <DataItem
            label='Release Year'
            children={moment(selectedMedia.Released).format('MM/DD/YYYY')}
            labelClasses='pt-100'
          />
          <DataItem label='Director' children={selectedMedia.Director} labelClasses='pt-100' />
          <DataItem label='Actors' children={selectedMedia.Actors} labelClasses='pt-100' />
          <DataItem label='Writers' children={selectedMedia.Writer} labelClasses='pt-100' />
          <DataItem label='Genre' children={selectedMedia.Genre} labelClasses='pt-100' />
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

const MediaType = ({ type }) => {
  let icon
  switch (type) {
    case 'game':
      icon = (
        <>
          <img src={game} className='media-type-icon' alt='' />
          <span className='media-type-text game'>Game</span>
        </>
      )
      break
    case 'series':
      icon = (
        <>
          <img src={tv} className='media-type-icon' alt='' />
          <span className='media-type-text tv'>TV</span>
        </>
      )
      break
    default:
      icon = (
        <>
          <img src={movie} className='media-type-icon' alt='' />
          <span className='media-type-text movie'>Movie</span>
        </>
      )
      break
  }
  return icon
}
