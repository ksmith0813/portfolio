import React from 'react'
import { Row, Spin } from 'antd'
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps'
import { isArray } from 'utils/general'
import { keys } from 'keys'
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

export const Loader = () => (
  <div className='pt-500'>
    <Spin size='large' />
  </div>
)

export const MapLocation = ({ location, containerClass }) => {
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

export const NoData = ({ message = 'No Data' }) => (
  <div className='flex flex-column justify-center'>
    <svg className='ant-empty-img-simple' width='64' height='41' viewBox='0 0 64 41' xmlns='http://www.w3.org/2000/svg'>
      <g transform='translate(0 1)' fill='none'>
        <g className='ant-empty-img-simple-g'>
          <path d='M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z'></path>
          <path
            d='M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z'
            className='ant-empty-img-simple-path'
          ></path>
        </g>
      </g>
    </svg>
    <div className='no-data-message'>{message}</div>
  </div>
)
