import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Spin, Col, Row } from 'antd'
import { NoData } from 'components/_siteWide/layout/layout'
import {
  getState as getMediaState,
  setLoading,
  setClean,
  setSearch,
  setData,
  setSelectedMedia,
} from 'store/slices/mediaSlice'
import api from 'utils/api'
import './media.scss'
import { MediaDetail } from './controls/mediaDetail'
import { MediaList } from './controls/mediaList'

export const Media = () => {
  const state = useSelector(getMediaState)
  const dispatch = useDispatch()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (state.selectedMedia || state.clean) return
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

      dispatch(setClean(true))
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [state.search, state.selectedMedia, state.clean, dispatch])

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
    dispatch(setClean(false))
    dispatch(setSelectedMedia(null))
  }

  const loading = state.loading
  const data = state.data
  const selectedMedia = state.selectedMedia

  return (
    <Col span={24}>
      <Row>
        <Input
          size='large'
          onChange={onSearchChange}
          value={state.search}
          placeholder='You can search for your favorite movie, TV show, or video game.'
          allowClear
        />
      </Row>
      <div className={`media-list-container ${loading || !data.length ? 'no-data' : ''}`}>
        {loading && <Spin className='content-center pt-300' />}
        {!loading && !data.length && !selectedMedia && <NoData />}
        {!loading && data.length > 0 && !selectedMedia && <MediaList />}
        {!loading && selectedMedia && <MediaDetail />}
      </div>
    </Col>
  )
}
