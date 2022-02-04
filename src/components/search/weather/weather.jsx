import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withScriptjs, withGoogleMap } from 'react-google-maps'
import { Input, Spin, Col, Row, Progress, Button } from 'antd'
import { DataItem, NoData, MapLocation } from 'components/_siteWide/layout/layout'
import { GoogleMap } from 'constants/googleMap'
import { getState, setLoading, setSearch, setWeather } from 'store/slices/weatherSlice'
import api from 'utils/api'
import moment from 'moment'
import './weather.scss'

export const Weather = () => {
  const state = useSelector(getState)
  const dispatch = useDispatch()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
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
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [state.search, dispatch])

  const onSearchChange = (e) => {
    dispatch(setSearch(e.target.value || ''))
  }

  const clear = () => {
    dispatch(setSearch(''))
    dispatch(setWeather(null))
  }

  const loading = state.loading
  const weather = state.weather

  return (
    <div className='page justify-center'>
      <Col span={24}>
        <Row className='fs-125'>Weather Finder</Row>
        <Row className='pt-200'>
          <Input
            onChange={onSearchChange}
            value={state.search}
            placeholder='You can search by zip code, latitude/longitude, or city/state.'
            allowClear
          />
        </Row>
        <div className={`weather-container ${loading || (!loading && !weather) ? 'content-center' : ''}`}>
          {loading && <Spin className='pt-200' />}
          {!loading && !weather && <NoData />}
          {!loading && weather && <WeatherContent weather={weather} clear={clear} />}
        </div>
      </Col>
    </div>
  )
}

const WeatherContent = ({ weather, clear }) => {
  const location = weather.location
  const current = weather.current
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
              googleMapURL={GoogleMap.url}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%`, width: '100%' }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </Col>
        <Col span={8} className='pl-200'>
          <DataItem label='Location' children={location.name} childrenClasses='fs-150 bold' />
          <DataItem label='Country' children={location.region} labelClasses='pt-150' />
          <DataItem label='Latitude' children={location.lat} labelClasses='pt-150' />
          <DataItem label='Longitude' children={location.lon} labelClasses='pt-150' />
          <DataItem label='Timezone' children={location.tz_id} labelClasses='pt-150' />
          <DataItem
            label='Local Time'
            children={moment(location.localtime).format('MM/DD/YYYY h:mm A')}
            labelClasses='pt-150'
          />
        </Col>
        <Col span={8} className='pl-200'>
          <DataItem label='Current Temp' children={`${current.temp_f} F`} childrenClasses='fs-150' />
          <DataItem label='Humidity' children={<Progress percent={current.humidity} />} labelClasses='pt-150' />
          <DataItem label='Wind Speed' children={`${current.wind_mph} MPH`} labelClasses='pt-150' />
          <DataItem label='Wind Direction' children={current.wind_dir} labelClasses='pt-150' />
          <DataItem label='Cloud Cover' children={<Progress percent={current.cloud} />} labelClasses='pt-150' />
          <DataItem
            label='Last Updated'
            children={moment(location.last_updated).format('MM/DD/YYYY h:mm A')}
            labelClasses='pt-150'
          />
        </Col>
      </Row>
    </>
  )
}

const Map = () => <MapLocation lat={36.06} lon={-94.16} />

const MapComponent = withScriptjs(withGoogleMap(Map))
