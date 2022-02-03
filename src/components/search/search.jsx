import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Spin, Col, Row, Progress, Button } from 'antd'
import { NoData } from 'components/_siteWide/layout/layout'
import { getState, setLoading, setSearch, setMovies, setSelectedId, setSelectedMovie } from 'store/slices/searchSlice'
import api from 'utils/api'
import { DataItem } from 'components/_siteWide/layout/layout'
import moment from 'moment'
import movie from 'assets/movie-active.svg'
import tv from 'assets/tv.svg'
import game from 'assets/game.svg'
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
            dispatch(setMovies([...new Set(data.Search)]))
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
    if (!state.selectedId) return
    api.getMovie(state.selectedId).then(({ data }) => {
      dispatch(setLoading(true))
      dispatch(setSelectedMovie(data))
      dispatch(setLoading(false))
    })
  }, [state.selectedId, dispatch])

  const onSearchChange = (e) => {
    dispatch(setSearch(e.target.value || ''))
    dispatch(setSelectedMovie(null))
  }

  const getMovie = (id) => dispatch(setSelectedId(id))

  const backToAll = () => dispatch(setSelectedMovie(null))

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
  const movies = state.movies
  const selectedMovie = state.selectedMovie

  return (
    <div className='page justify-center'>
      <Col span={13}>
        <Row justify='center' className='fs-200 text-center'>
          Search for Entertainment
        </Row>
        <Row justify='center' className='pt-125 text-center light-text'>
          <Col span={10}>
            You can search for your favorite movie, TV show, or video game you really enjoyed playing.
          </Col>
        </Row>
        <Row justify='center' className='m-200'>
          <Col span={10}>
            <Input onChange={onSearchChange} value={state.search} placeholder='Search' allowClear />
          </Col>
        </Row>
        <div className={`movie-list-container ${loading || !movies.length ? 'content-center' : ''}`}>
          {loading && (
            <div className='content-center'>
              <Spin />
            </div>
          )}
          {!loading && !movies.length && <NoData />}
          {!loading && movies.length > 0 && !selectedMovie && <MovieList movies={movies} getMovie={getMovie} />}
          {!loading && selectedMovie && (
            <MovieDetail selectedMovie={selectedMovie} getRating={getRating} backToAll={backToAll} />
          )}
        </div>
      </Col>
    </div>
  )
}

const MovieList = ({ movies, getMovie }) => (
  <>
    <div className='movie-list-items'>
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
      {movies.map((t, i) => (
        <Row key={i} className='p-100 clickable-rows' onClick={() => getMovie(t.imdbID)}>
          <Col span={16}>{t.Title}</Col>
          <Col span={4} className='pl-050'>
            {t.Year}
          </Col>
          <Col span={4} className='pl-050 capitalize'>
            <MovieType type={t.Type} />
          </Col>
        </Row>
      ))}
    </div>
  </>
)

const MovieDetail = ({ selectedMovie, getRating, backToAll }) => {
  const hasRatings = selectedMovie.Ratings.length > 0

  return (
    <div>
      <Row className='movie-detail'>
        <Col flex={1}>Movie Details</Col>
        <Col>
          <Button type='primary' onClick={() => backToAll()}>
            Back to All
          </Button>
        </Col>
      </Row>
      <Row className='pt-200'>
        <Col span={7}>
          {selectedMovie.Poster !== 'N/A' && (
            <img src={selectedMovie.Poster} className='movie-poster box-shadow' alt='' />
          )}
          {selectedMovie.Poster === 'N/A' && <NoData message='Poster not available' />}
        </Col>
        <Col span={9}>
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
          {hasRatings && (
            <>
              <b>Ratings</b>
              {selectedMovie.Ratings.map((r) => (
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
            children={selectedMovie.BoxOffice}
            labelClasses={hasRatings ? 'pt-200' : ''}
            childrenClasses='fs-150'
          />
        </Col>
      </Row>
    </div>
  )
}

const MovieType = ({ type }) => {
  let icon
  switch (type) {
    case 'game':
      icon = (
        <>
          <img src={game} className='movie-type-icon' alt='' />
          <span className='movie-type-text game'>Game</span>
        </>
      )
      break
    case 'series':
      icon = (
        <>
          <img src={tv} className='movie-type-icon' alt='' />
          <span className='movie-type-text tv'>TV</span>
        </>
      )
      break
    default:
      icon = (
        <>
          <img src={movie} className='movie-type-icon' alt='' />
          <span className='movie-type-text movie'>Movie</span>
        </>
      )
      break
  }
  return icon
}
