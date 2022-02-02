import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Spin, Col, Row, Progress, Button } from 'antd'
import { NoData } from 'components/_siteWide/layout/layout'
import {
  getState,
  setLoading,
  setSearch,
  setMovies,
  setSelectedTitle,
  setSelectedMovie,
} from 'store/slices/searchSlice'
import api from 'utils/api'
import { DataItem } from 'components/_siteWide/layout/layout'
import moment from 'moment'
import './search.scss'

export const Search = () => {
  const state = useSelector(getState)
  const dispatch = useDispatch()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (state.search) {
        dispatch(setLoading(true))
        api.getMovies(state.search).then(({ data }) => {
          if (data.Search) {
            dispatch(setMovies(data.Search))
          } else {
            dispatch(setMovies([]))
            dispatch(setSelectedMovie(null))
          }

          dispatch(setLoading(false))
        })
      } else {
        dispatch(setMovies([]))
        dispatch(setSelectedMovie(null))
      }
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [state.search, dispatch])

  useEffect(() => {
    if (!state.selectedTitle) return
    api.getMovie(state.selectedTitle).then(({ data }) => {
      dispatch(setLoading(true))
      dispatch(setSelectedMovie(data))
      dispatch(setLoading(false))
    })
  }, [state.selectedTitle, dispatch])

  const onSearchChange = (e) => {
    dispatch(setSearch(e.target.value || ''))
    dispatch(setSelectedMovie(null))
  }

  const getRating = (rating) => {
    let value
    if (rating.includes('/')) {
      value = parseFloat(rating.split('/')[0])
    } else if (rating.includes('%')) {
      value = parseFloat(rating.split('&')[0])
    }

    return value
  }

  const loading = state.loading
  const movies = state.movies
  const selectedMovie = state.selectedMovie

  return (
    <div className='page justify-center'>
      <Col span={13}>
        <Row justify='center' className='fs-175 text-center'>
          Movie Search
        </Row>
        <Row justify='center' className='m-200'>
          <Col span={10}>
            <Input onChange={onSearchChange} value={state.search} placeholder='Search for movies' allowClear />
          </Col>
        </Row>
        <div className='movie-list-container'>
          {loading && (
            <div className='content-center'>
              <Spin />
            </div>
          )}
          {!loading && !movies.length && <NoData />}
          {!loading && movies?.length > 0 && !selectedMovie && (
            <>
              <div className='movie-list-items'>
                <Row className='p-100 header-row'>
                  <Col span={18}>
                    <b>Title</b>
                  </Col>
                  <Col span={6} className='pl-050'>
                    <b>Type</b>
                  </Col>
                </Row>
                {movies.map((t, i) => (
                  <Row key={i} className='p-100 clickable-rows' onClick={() => dispatch(setSelectedTitle(t.Title))}>
                    <Col span={18}>{t.Title}</Col>
                    <Col span={6} className='pl-050'>
                      {t.Type}
                    </Col>
                  </Row>
                ))}
              </div>
            </>
          )}
          {!loading && selectedMovie && (
            <>
              <div className='movie-detail'>
                <Row className='p-100'>
                  <Col span={6}>
                    <img src={selectedMovie.Poster} className='movie-poster' alt='' />
                  </Col>
                  <Col span={10} className='pl-200'>
                    <DataItem label='Title' children={selectedMovie.Title} childrenClasses='fs-150 bold' />
                    <DataItem label='Plot' children={selectedMovie.Plot} labelClasses='pt-100' />
                    <DataItem
                      label='Release Year'
                      children={moment(selectedMovie.Released).format('MM/DD/YYYY')}
                      labelClasses='pt-100'
                    />
                    <DataItem label='Director' children={selectedMovie.Director} labelClasses='pt-100' />
                    <DataItem label='Actors' children={selectedMovie.Actors} labelClasses='pt-100' />
                    <DataItem label='Genre' children={selectedMovie.Genre} labelClasses='pt-100' />
                    <DataItem label='Rated' children={selectedMovie.Rated} labelClasses='pt-100' />
                  </Col>
                  <Col span={8} className='pl-200'>
                    <b>Ratings</b>
                    {selectedMovie.Ratings && selectedMovie.Ratings.map((r) => (
                      <DataItem
                        key={r.Source}
                        label={r.Source === 'Internet Movie Database' ? 'IMDB' : r.Source}
                        children={
                          <Progress
                            percent={getRating(r.Value)}
                            strokeColor={{
                              '0%': '#1890ff',
                              '100%': '#64d28d',
                            }}
                          />
                        }
                        labelClasses='pt-150 light-text'
                      />
                    ))}
                    <DataItem
                      label='Box Office'
                      children={selectedMovie.BoxOffice}
                      labelClasses='pt-200'
                      childrenClasses='fs-150'
                    />
                  </Col>
                </Row>
              </div>
              <Row justify='center' className='pt-400'>
                <Button type='primary' onClick={() => dispatch(setSelectedMovie(null))}>
                  Back to All
                </Button>
              </Row>
            </>
          )}
        </div>
      </Col>
    </div>
  )
}
