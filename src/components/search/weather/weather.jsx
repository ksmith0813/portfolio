import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withScriptjs, withGoogleMap } from 'react-google-maps'
import { Input, Spin, Col, Row, Progress, Button } from 'antd'
import { DataItem, NoData, MapLocation } from 'components/_siteWide/layout/layout'
import { getState, setLoading, setClean, setSearch, setWeather } from 'store/slices/weatherSlice'
import api from 'utils/api'
import { keys } from 'keys'
import moment from 'moment'
import './weather.scss'

export const Weather = () => {
  const state = useSelector(getState)
  const dispatch = useDispatch()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (state.clean) return
      if (state.search) {
        dispatch(setLoading(true))
        api
          .getWeather(state.search)
          .then(({ data }) => {
            if (data.location) {
              dispatch(setWeather(data))
            } else {
              dispatch(setWeather(null))
            }

            dispatch(setLoading(false))
          })
          .catch(() => {
            dispatch(setLoading(false))
            dispatch(setWeather(null))
          })
      } else {
        dispatch(setWeather(null))
      }

      dispatch(setClean(true))
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [state.search, state.clean, dispatch])

  const onSearchChange = (e) => {
    dispatch(setSearch(e.target.value || ''))
    dispatch(setClean(false))
  }

  const clear = () => {
    dispatch(setSearch(''))
    dispatch(setWeather(null))
  }

  const loading = state.loading
  const weather = state.weather

  return (
    <Col span={24}>
      <Row>
        <Input
          size='large'
          onChange={onSearchChange}
          value={state.search}
          placeholder='You can search by zip code, latitude/longitude, or city/state.'
        />
      </Row>
      <div className={`weather-container ${loading || (!loading && !weather) ? 'content-center' : ''}`}>
        {loading && <Spin className='pt-200' />}
        {!loading && !weather && <NoData />}
        {!loading && weather && <WeatherContent weather={weather} clear={clear} />}
      </div>
    </Col>
  )
}

const WeatherContent = ({ weather, clear }) => {
  const location = weather.location
  const current = weather.current
  const Map = () => <MapLocation lat={location.lat} lon={location.lon} />
  const MapComponent = withScriptjs(withGoogleMap(Map))
  return (
    <>
      <Row className='pb-100 fs-150 border-bottom-light'>
        <Col flex={1}>
          {location.name}, {location.region}
        </Col>
        <Col>
          <Button type='primary' onClick={() => clear()}>
            Clear
          </Button>
        </Col>
      </Row>
      <Row className='pt-200'>
        <Col span={8}>
          <div className='map-container'>
            <MapComponent
              googleMapURL={keys.mapUrl}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%`, width: '100%' }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </Col>
        <Col span={8} className='pl-300'>
          <Row>
            <Col span={12}>
              <DataItem
                label='Current Temp'
                children={`${current.temp_f}° F | ${current.temp_c}° C`}
                childrenClasses='fs-150'
              />
            </Col>
            <Col span={12}>
              <DataItem
                label='Feels Like'
                children={`${current.feelslike_f}° F | ${current.feelslike_c}° C`}
                childrenClasses='fs-150'
              />
            </Col>
          </Row>
          {current.condition && (
            <Row className='pt-150'>
              <Col span={12}>
                <DataItem label='Condition' children={current.condition.text} childrenClasses='fs-150' />
              </Col>
              <Col span={12}>
                <img src={current.condition.icon} alt='' />
              </Col>
            </Row>
          )}

          <DataItem label='Humidity' children={<Progress percent={current.humidity} />} labelClasses='pt-150' />
          <DataItem label='Cloud Cover' children={<Progress percent={current.cloud} />} labelClasses='pt-150' />
          <Row className='pt-100'>
            <Col span={12}>
              <DataItem label='Wind' children={`${current.wind_mph} MPH`} labelClasses='pt-150' />
            </Col>
            <Col span={12}>
              <DataItem label='Wind Direction' children={current.wind_dir} labelClasses='pt-150' />
            </Col>
          </Row>
        </Col>
        <Col span={8} className='pl-300'>
          <DataItem label='Latitude' children={location.lat} />
          <DataItem label='Longitude' children={location.lon} labelClasses='pt-150' />
          <DataItem label='Timezone' children={location.tz_id} labelClasses='pt-150' />
          <DataItem
            label='Local Time'
            children={moment(location.localtime).format('MM/DD/YYYY h:mm A')}
            labelClasses='pt-150'
          />
        </Col>
      </Row>
    </>
  )
}
