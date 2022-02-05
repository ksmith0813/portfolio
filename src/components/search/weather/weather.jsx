import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withScriptjs, withGoogleMap } from 'react-google-maps'
import { Input, Spin, Col, Row, Progress, Button, Tag } from 'antd'
import { DataItem, NoData, MapLocation } from 'components/_siteWide/layout/layout'
import { getState, setLoading, setClean, setSearch, setWeather } from 'store/slices/weatherSlice'
import api from 'utils/api'
import { keys } from 'keys'
import moment from 'moment'
import newMoon from 'assets/moon-new.svg'
import waxingCrescent from 'assets/moon-waxing-crescent.svg'
import firstQuarter from 'assets/moon-first-quarter.svg'
import waxingGibbous from 'assets/moon-waxing-gibbous.svg'
import fullMoon from 'assets/moon-full.svg'
import waningGibbous from 'assets/moon-waning-gibbous.svg'
import lastQuarter from 'assets/moon-last-quarter.svg'
import waningCrescent from 'assets/moon-waning-crescent.svg'
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
  const forecastDay = weather.forecast?.forecastday[0]
  const currentTime = moment().local()
  let forecastHourly = forecastDay ? forecastDay.hour.filter((f) => moment(f.time) >= currentTime) : []
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
              loadingElement={<div style={{ height: '100%', width: '100%' }} />}
              containerElement={<div style={{ height: '100%', width: '100%' }} />}
              mapElement={<div style={{ height: '100%', width: '100%' }} />}
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
              <DataItem
                label='Wind Direction'
                children={<Tag color='blue'>{current.wind_dir}</Tag>}
                labelClasses='pt-150'
              />
            </Col>
          </Row>
        </Col>
        <Col span={8} className='pl-300'>
          {forecastDay && forecastDay.astro && (
            <>
              <Row>
                <Col span={12}>
                  <DataItem label='Sunrise' children={forecastDay.astro.sunrise} childrenClasses='fs-150' />
                </Col>
                <Col span={12}>
                  <DataItem label='Sunset' children={forecastDay.astro.sunset} childrenClasses='fs-150' />
                </Col>
              </Row>
              <Row className='pt-150'>
                <Col span={12}>
                  <DataItem label='Moon Phase' children={forecastDay.astro.moon_phase} />
                </Col>
                <Col span={12}>
                  <MoonPhaseImg phase={forecastDay.astro.moon_phase} />
                </Col>
              </Row>
            </>
          )}
          <Row className='pt-150'>
            <Col span={12}>
              <DataItem
                label='Local Time'
                children={moment(location.localtime).format('MM/DD/YYYY h:mm A')}
                labelClasses='pt-150'
              />
            </Col>
            <Col span={12}>
              <DataItem label='Timezone' children={location.tz_id} labelClasses='pt-150' />
            </Col>
          </Row>
          <Row className='pt-150'>
            <Col span={12}>
              <DataItem label='Latitude' children={location.lat} />
            </Col>
            <Col span={12}>
              <DataItem label='Longitude' children={location.lon} />
            </Col>
          </Row>
        </Col>
      </Row>
      {forecastHourly && forecastHourly.length && (
        <>
          <Row className='pt-300 pb-100 fs-150 border-bottom-light'>Hourly Weather</Row>
          <Row justify='space-around pt-100'>
            {forecastHourly.map((f) => (
              <div key={f.time_epoch} className='forecast-item'>
                <div>
                  <b>{moment(f.time).format('h:mm A')}</b>
                </div>
                <div className='pt-050'>
                  <img src={f.condition?.icon} alt='' />
                </div>
                <div className='pt-050 medium-text'>{`${current.temp_f}° F | ${current.temp_c}° C`}</div>
                <div className='pt-050 light-text'>{f.condition?.text}</div>
              </div>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

const MoonPhaseImg = ({ phase }) => {
  let img

  switch (phase) {
    case 'Waxing Crescent':
      img = <img src={waxingCrescent} className='moon-phase-icon' alt='' />
      break
    case 'First Quarter':
      img = <img src={firstQuarter} className='moon-phase-icon' alt='' />
      break
    case 'Waxing Gibbous':
      img = <img src={waxingGibbous} className='moon-phase-icon' alt='' />
      break
    case 'Full Moon':
      img = <img src={fullMoon} className='moon-phase-icon' alt='' />
      break
    case 'Waning Gibbous':
      img = <img src={waningGibbous} className='moon-phase-icon' alt='' />
      break
    case 'Last Quarter':
      img = <img src={lastQuarter} className='moon-phase-icon' alt='' />
      break
    case 'Waning Crescent':
      img = <img src={waningCrescent} className='moon-phase-icon' alt='' />
      break
    default:
      img = <img src={newMoon} className='moon-phase-icon' alt='' />
      break
  }

  return img
}
