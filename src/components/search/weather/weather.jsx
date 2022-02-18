import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Spin, Col, Row, Progress, Tag, Switch } from 'antd'
import { DataItem, NoData, MapLocation } from 'components/_siteWide/layout/layout'
import { getState, setLoading, setClean, setSearch, setWeather } from 'store/slices/weatherSlice'
import api from 'utils/api'
import moment from 'moment'
import newMoon from 'assets/moon/moon-new.svg'
import waxingCrescent from 'assets/moon/moon-waxing-crescent.svg'
import firstQuarter from 'assets/moon/moon-first-quarter.svg'
import waxingGibbous from 'assets/moon/moon-waxing-gibbous.svg'
import fullMoon from 'assets/moon/moon-full.svg'
import waningGibbous from 'assets/moon/moon-waning-gibbous.svg'
import lastQuarter from 'assets/moon/moon-last-quarter.svg'
import waningCrescent from 'assets/moon/moon-waning-crescent.svg'
import './weather.scss'

export const Weather = ({ showDetails }) => {
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
            if (data.location) dispatch(setWeather(data))
            else dispatch(setWeather(null))
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
          allowClear
        />
      </Row>
      <div className={`weather-container ${loading || (!loading && !weather) ? 'content-center' : ''}`}>
        {loading && <Spin className='pt-200' />}
        {!loading && !weather && <NoData />}
        {!loading && weather && <WeatherContent weather={weather} showDetails={showDetails} />}
      </div>
    </Col>
  )
}

const WeatherContent = ({ weather, showDetails }) => {
  const [type, setType] = useState('F')
  const currentTime = moment().local()
  const location = weather.location
  const current = weather.current
  const forecastDay = weather.forecast?.forecastday[0]
  const forecastHourly = forecastDay ? forecastDay.hour.filter((f) => moment(f.time) >= currentTime) : null
  const colSpan = showDetails ? 8 : 12

  return (
    <div className='weather-detail'>
      <HeaderRow location={location} type={type} setType={setType} />
      <Row className='pt-200'>
        <Col span={colSpan}>
          <MapLocation location={location} containerClass='map-container' />
        </Col>
        <Col span={colSpan} className='pl-300'>
          <CurrentWeather current={current} type={type} />
        </Col>
        {showDetails && (
          <Col span={colSpan} className='pl-300'>
            <Astro astro={forecastDay.astro} />
            <LocationTime location={location} />
          </Col>
        )}
      </Row>
      {showDetails && forecastHourly && <HourlyWeather forecastHourly={forecastHourly} type={type} />}
    </div>
  )
}

const HeaderRow = ({ location, type, setType }) => (
  <Row className='pb-100 fs-150 border-bottom-light'>
    <Col flex={1}>
      {location.name}, {location.region}
    </Col>
    <Col>
      <span className='mr-050'>Temp</span>
      <Switch
        checked={type === 'F'}
        unCheckedChildren='C'
        checkedChildren='F'
        onChange={(checked) => setType(checked ? 'F' : 'C')}
      />
    </Col>
  </Row>
)

const CurrentWeather = ({ current, type }) => (
  <>
    <Row>
      <Col span={12}>
        <DataItem
          label='Current Temp'
          children={`${!type || type === 'F' ? current.temp_f : current.temp_c}° ${type}`}
          childrenClasses='fs-150'
        />
      </Col>
      <Col span={12}>
        <DataItem
          label='Feels Like'
          children={`${!type || type === 'F' ? current.feelslike_f : current.feelslike_c}° ${type}`}
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
        <DataItem label='Wind Direction' children={<Tag>{current.wind_dir}</Tag>} labelClasses='pt-150' />
      </Col>
    </Row>
  </>
)

const Astro = ({ astro }) => (
  <>
    <Row>
      <Col span={12}>
        <DataItem label='Sunrise' children={astro.sunrise} childrenClasses='fs-150' />
      </Col>
      <Col span={12}>
        <DataItem label='Sunset' children={astro.sunset} childrenClasses='fs-150' />
      </Col>
    </Row>
    <Row className='pt-150'>
      <Col span={12}>
        <DataItem label='Moon Phase' children={astro.moon_phase} />
      </Col>
      <Col span={12}>
        <MoonPhaseImg phase={astro.moon_phase} />
      </Col>
    </Row>
  </>
)

const LocationTime = ({ location }) => (
  <>
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
  </>
)

const HourlyWeather = ({ forecastHourly, type }) => (
  <>
    <Row className='pt-300 pb-100 fs-150 border-bottom-light'>Hourly Weather for {moment().format('MM/DD/YYYY')}</Row>
    <Row className='hourly-forecast'>
      {forecastHourly.map((f) => (
        <div key={f.time_epoch} className='forecast-item'>
          <div>
            <b>{moment(f.time).format('hA')}</b>
          </div>
          <div className='pt-050'>
            <img src={f.condition?.icon} alt='' />
          </div>
          <div className='pt-050 medium-text'>{`${type === 'F' ? f.temp_f : f.temp_c}° ${type}`}</div>
          <div className='pt-050 light-text'>{f.condition?.text}</div>
        </div>
      ))}
    </Row>
  </>
)

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
