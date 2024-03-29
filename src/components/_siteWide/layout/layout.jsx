import React from 'react'
import { useSelector } from 'react-redux'
import { isArray } from 'underscore'
import { Row } from 'antd'
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps'
import { keys } from 'keys'
import { LottieFile } from '../animation/lottieFile'
import noData from 'assets/no-data.svg'
import loaderBlue from 'assets/default/json/loader-default.json'
import loaderGreen from 'assets/green/json/loader-green.json'
import loaderPurple from 'assets/purple/json/loader-purple.json'
import './layout.scss'

export const DataItem = ({ label, children, labelClasses = '', childrenClasses = '' }) => {
  if ((isArray(children) && !children.length) || !children) children = 'N/A'
  return (
    <>
      <Row className={labelClasses}>
        <b>{label}</b>
      </Row>
      <Row className={`light-text ${childrenClasses}`}>{children}</Row>
    </>
  )
}

export const Categories = ({ items, selected, onClick }) => {
  return items.map((c, i) => (
    <span className={`${selected === c && 'selected'} clickable`} key={i} onClick={() => onClick(c)}>
      {c}
    </span>
  ))
}

export const Loader = () => {
  const state = useSelector((state) => state.theme)
  const theme = state.selectedTheme
  const loader = theme === 'default' ? loaderBlue : theme === 'green' ? loaderGreen : loaderPurple
  return (
    <div className='pt-500'>
      <LottieFile animationData={loader} autoplay={true} height={200} width={200} />
    </div>
  )
}

export const MapLocation = ({ location, containerClass }) => {
  const MapMarker = ({ lat, lon }) => (
    <GoogleMap defaultZoom={14} defaultCenter={{ lat: lat, lng: lon }}>
      <Marker
        position={{
          lat: lat,
          lng: lon,
        }}
      />
    </GoogleMap>
  )

  const Map = () => <MapMarker lat={location.lat} lon={location.lon} />
  const MapComponent = withScriptjs(withGoogleMap(Map))

  return (
    <div className={containerClass}>
      <MapComponent
        googleMapURL={keys.mapUrl}
        loadingElement={<div style={{ height: '100%', width: '100%' }} />}
        containerElement={<div style={{ height: '100%', width: '100%' }} />}
        mapElement={<div style={{ height: '100%', width: '100%' }} />}
      />
    </div>
  )
}

export const NoData = ({ message = 'No Data' }) => (
  <div className='content-center'>
    <img src={noData} alt='' />
    <div className='no-data-message'>{message}</div>
  </div>
)
